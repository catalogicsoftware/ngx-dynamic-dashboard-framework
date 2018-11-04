import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {GadgetInstanceService} from '../../grid/grid.service';
import {RuntimeService} from '../../services/runtime.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetBase} from '../_common/gadget-base';
import {PieChartService} from './service';
import {OptionsService} from "../../configuration/tab-options/service";
import {startWith, switchMap} from "rxjs/operators";
import {interval} from "rxjs";
import {ConfigurationService} from "../../services/configuration.service";
declare var jQuery: any;

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-gadget.css']
})

export class PieChartGadgetComponent extends GadgetBase {

    @ViewChild('chartOptionsSideBar_tag') chartOptionsSideBarRef: ElementRef;
    chartOptionsSideBar:any;

    // chart options
    explodeSlices: boolean;
    showDonut: boolean;
    gradient: boolean;
    showLegend: boolean;
    showLabels: boolean;
    legendTitle = "Title";

    view: any[];
    colorScheme: any = {
        domain: ['#0d5481', '#0AFF16', '#4894FF','#F54B7D'] //todo - control color from property page
    };
    //////////////////

    data: any[] = [];
    subscription: any;
    state: string;

    RUN_STATE = 'run';
    STOP_STATE = 'stop';
    POLL_INTERVAL = 15000;


    constructor(protected _runtimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                protected _pieChartService: PieChartService,
                private _changeDetectionRef: ChangeDetectorRef,
                protected _optionsService: OptionsService,
                private _configService: ConfigurationService
    ) {
        super(_runtimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef,
            _optionsService);

    }

    public preRun() {

        /**
         * the base class initializes the common property gadgets. Prerun gives
         * us a chance to initialize any of the gadgets unique properties.
         */
        this.initializeTheRemainderOfTheProperties();

        if (this.getPropFromPropertyPages('state') == this.RUN_STATE) {
            this.run();
        }
    }

    initializeTheRemainderOfTheProperties() {

        this.explodeSlices = this.getPropFromPropertyPages('explodeSlices');
        this.showDonut = this.getPropFromPropertyPages('showDonut');
        this.gradient = this.getPropFromPropertyPages('gradient');
        this.showLegend = this.getPropFromPropertyPages('showLegend');
        this.showLabels = this.getPropFromPropertyPages('showLabels');

    }


    public run() {
        this.clearChartData();
        this.initializeRunState(true);
        this.updateData(null);
        this.saveState(this.RUN_STATE);

    }

    clearChartData() {
        this.data = [];
    }


    public stop() {

        this.stopWithoutStateSave();
        this.saveState(this.STOP_STATE);
    }

    /**
     * The state is being saved to allow the board to load with the last state. Also, when the gadget is moved
     * within the board we need to carry the gadget's state along.
     * @param state
     */
    public saveState(state: string) {

        this.updateProperties('{\"state\":\"' + state + '\"}');
        this.persistTheChangeInInternalState();

    }

    /**
     * When the gadget is destroyed (see ngOnDestroy) there is no need to
     * save the state. We just want to stop any API calls.
     */
    public stopWithoutStateSave() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        const data = [];
        Object.assign(this, {data});
        this.setStopState(false);

    }

    public updateData(someData: any[]) {
        this.data.length = 0;

        /**
         * poll every 15 seconds
         * todo - change this to a websocket
         */
        this.subscription = interval(this.POLL_INTERVAL).pipe(
            startWith(0), switchMap(() => this._pieChartService.getData(this.endpointObject.address)))
            .subscribe(data => {

                    Object.assign(this, {data});
                },
                error => this.handleError(error));
    }

    public drillDown(data) {
        // this._route.navigate(['/detail'], {});
    }


    private setInternalProperties(updatedPropsObject: any) {

        this.state = updatedPropsObject.state;

        if (updatedPropsObject.title != undefined) {

            this.title = updatedPropsObject.title;
            this.explodeSlices = updatedPropsObject.explodeSlices;
            this.showDonut = updatedPropsObject.showDonut;
            this.gradient = updatedPropsObject.gradient;
            this.showLegend = updatedPropsObject.showLegend;
            this.showLabels = updatedPropsObject.showLabels;

            this.setEndPoint(updatedPropsObject.endpoint);
            this.showOperationControls = true;
        }
    }

    /**
     * todo
     *  This is called from the dynamic property page form or when the internal running state changes
     *  A similar operation exists on the procmman-config-service
     *  whenever the property page form is saved, the in memory board model
     *  is updated as well as the gadget instance properties
     *  which is what the code below does. This can be eliminated with code added to the
     *  config service or the property page service.
     *
     * **/
    public updateProperties(updatedProperties: any) {

        const updatedPropsObject = JSON.parse(updatedProperties);

        /**
         * update this tools property pages
         */
        this.propertyPages.forEach(function (propertyPage) {


            for (let x = 0; x < propertyPage.properties.length; x++) {

                for (const prop in updatedPropsObject) {
                    if (updatedPropsObject.hasOwnProperty(prop)) {
                        if (prop === propertyPage.properties[x].key) {
                            propertyPage.properties[x].value = updatedPropsObject[prop];
                        }

                    }
                }
            }
        });

        /**
         * update the tools internal state
         */
        this.setInternalProperties(updatedPropsObject);

    }

    public ngOnDestroy() {

        this.stopWithoutStateSave();
    }


    /**
     * todo - need to improve how internal state is saved to persistant store
     */
    private persistTheChangeInInternalState() {
        let payLoad =
            "{\"instanceId\":" + this.instanceId
            + ",\"title\":\"" + this.title
            + "\",\"state\":\"" + this.state
            + "\",\"endpoint\":\"" + this.endpointObject.name
            + "\",\"explodeSlices\":" + this.explodeSlices
            + ",\"showDonut\":"  + this.showDonut
            + ",\"gradient\":" + this.gradient
            + ",\"showLegend\":" + this.showLegend
            + ",\"showLabels\":" + this.showLabels
            + "}";

        this._configService.notifyGadgetOnPropertyChange(payLoad, this.instanceId);

    }

    toggleChartProperties() {

        if(this.globalOptions.displayGadgetOptionsInSideBar == false){
            this.toggleConfigMode();
            return;
        }
        this.chartOptionsSideBar = jQuery(this.chartOptionsSideBarRef.nativeElement);
        this.chartOptionsSideBar.sidebar('setting', 'transition', 'overlay');
        this.chartOptionsSideBar.sidebar('toggle');

    }

}
