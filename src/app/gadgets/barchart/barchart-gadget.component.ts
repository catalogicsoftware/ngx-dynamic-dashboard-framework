import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {GadgetInstanceService} from '../../grid/grid.service';
import {RuntimeService} from '../../services/runtime.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetBase} from '../_common/gadget-base';
import {BarChartService} from './service';
import {Router} from '@angular/router';
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

export class BarChartGadgetComponent extends GadgetBase {

    @ViewChild('chartOptionsSideBar_tag') chartOptionsSideBarRef: ElementRef;
    chartOptionsSideBar: any;

    // chart options
    showXAxis: boolean;
    showYAxis: boolean;
    gradient: boolean;
    showLegend: boolean;
    showXAxisLabel: boolean;
    showYAxisLabel: boolean;
    barChartType: string;
    showDataLabel: boolean;
    yAxisLabel: string;
    xAxisLabel: string;
    view: any[];
    colorScheme: any = {
        domain: ['#0AFF16', '#B2303B'] //todo - control color from property page
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
                protected _barChartService: BarChartService,
                private _changeDetectionRef: ChangeDetectorRef,
                protected _optionsService: OptionsService,
                private _configService: ConfigurationService,
                private _route: Router
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

        this.gradient = this.getPropFromPropertyPages('gradient');
        this.showXAxis = this.getPropFromPropertyPages('showXAxis');
        this.showYAxis = this.getPropFromPropertyPages('showYAxis');
        this.showLegend = this.getPropFromPropertyPages('showLegend');
        this.showXAxisLabel = this.getPropFromPropertyPages('showXAxisLabel');
        this.showYAxisLabel = this.getPropFromPropertyPages('showYAxisLabel');
        this.barChartType = this.getPropFromPropertyPages('barChartType');
        this.showDataLabel = this.getPropFromPropertyPages('showDataLabel');
        this.yAxisLabel = this.getPropFromPropertyPages('yAxisLabel');
        this.xAxisLabel = this.getPropFromPropertyPages('xAxisLabel');

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
            startWith(0), switchMap(() => this._barChartService.getData(this.endpointObject.address)))
            .subscribe(data => {

                    Object.assign(this, {data});
                },
                error => this.handleError(error));
    }

    public drillDown(data) {

        this.stopWithoutStateSave();

        this._route.navigate(['/detail'], {
            queryParams:
                {
                    chartType:"bar",
                    chartSeries: data.series,
                    chartMetric: data.name,
                    endPointName: this.endpointObject.name
                }
        });
    }


    private setInternalProperties(updatedPropsObject: any) {

        this.state = updatedPropsObject.state;

        if (updatedPropsObject.title != undefined) {

            this.title = updatedPropsObject.title;
            this.showXAxis = updatedPropsObject.showXAxis;
            this.showYAxis = updatedPropsObject.showYAxis;
            this.gradient = updatedPropsObject.gradient;
            this.showLegend = updatedPropsObject.showLegend;
            this.showXAxisLabel = updatedPropsObject.showXAxisLabel;
            this.showYAxisLabel = updatedPropsObject.showYAxisLabel;
            this.barChartType = updatedPropsObject.barChartType;
            this.showDataLabel = updatedPropsObject.showDataLabel;
            this.xAxisLabel = updatedPropsObject.xAxisLabel;
            this.yAxisLabel = updatedPropsObject.yAxisLabel;
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
            + "\",\"gradient\":" + this.gradient
            + ",\"showXAxis\":" + this.showXAxis
            + ",\"showYAxis\":" + this.showYAxis
            + ",\"showLegend\":" + this.showLegend
            + ",\"showXAxisLabel\":" + this.showXAxisLabel
            + ",\"showYAxisLabel\":" + this.showYAxisLabel
            + ",\"showDataLabel\":" + this.showDataLabel
            + ",\"barChartType\":\"" + this.barChartType
            + "\",\"yAxisLabel\":\"" + this.yAxisLabel
            + "\",\"xAxisLabel\":\"" + this.xAxisLabel
            + "\"}";


        this._configService.notifyGadgetOnPropertyChange(payLoad, this.instanceId);

    }

    toggleChartProperties() {

        if (this.globalOptions.displayGadgetOptionsInSideBar == false) {
            this.toggleConfigMode();
            return;
        }
        this.chartOptionsSideBar = jQuery(this.chartOptionsSideBarRef.nativeElement);
        this.chartOptionsSideBar.sidebar('setting', 'transition', 'overlay');
        this.chartOptionsSideBar.sidebar('toggle');

    }

}
