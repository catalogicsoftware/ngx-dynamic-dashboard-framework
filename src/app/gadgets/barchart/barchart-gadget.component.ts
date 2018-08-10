import {ChangeDetectorRef, Component} from '@angular/core';
import {GadgetInstanceService} from '../../grid/grid.service';
import {RuntimeService} from '../../services/runtime.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetBase} from '../_common/gadget-base';
import {BarChartService} from './service';
import {Router} from '@angular/router';
import {OptionsService} from "../../configuration/tab-options/service";
import {startWith, switchMap} from "rxjs/operators";
import {Observable} from "rxjs/Rx";
import {ConfigurationService} from "../../services/configuration.service";

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-gadget.css']
})

export class BarChartGadgetComponent extends GadgetBase {

    // chart options
    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = true;
    showXAxisLabel = true;
    showYAxisLabel = false;
    yAxisLabel = 'committed';
    xAxisLabel = 'used';
    view: any[];
    data: any[] = [];
    verticalOrientation = false;
    colorScheme: any = {
        domain: ['#0d5481', '#0AFF16'] //todo - control color from property page
    };
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
                private _route: Router) {
        super(_runtimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef,
            _optionsService);

    }

    public preRun() {

        if (this.getPropFromPropertyPages('state') == this.RUN_STATE) {
            this.run();
        }
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
        this.subscription = Observable.interval(this.POLL_INTERVAL).pipe(
            startWith(0), switchMap(() => this._barChartService.getData(this.endpointObject.address)))
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
            this.showXAxis = updatedPropsObject.showXAxis;
            this.showYAxis = updatedPropsObject.showYAxis;
            this.gradient = updatedPropsObject.gradient;
            this.showLegend = updatedPropsObject.showLegend;
            this.showXAxisLabel = updatedPropsObject.showXAxisLabel;
            this.showYAxisLabel = updatedPropsObject.showYAxisLabel;
            this.verticalOrientation = updatedPropsObject.orientation;
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
            + "\",\"gradient\":\"" + this.gradient
            + "\",\"showXAxis\":\"" + this.showXAxis
            + "\",\"showYAxis\":\"" + this.showYAxis
            + "\",\"showLegend\":\"" + this.showLegend
            + "\",\"showXAxisLabel\":\"" + this.showXAxisLabel
            + "\",\"showYAxisLabel\":\"" + this.showYAxisLabel
            + "\",\"orientation\":\"" + this.verticalOrientation
            + "\"}";

        this._configService.notifyGadgetOnPropertyChange(payLoad, this.instanceId);

    }
}
