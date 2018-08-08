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
    showLegend= true;
    showXAxisLabel = true;
    showYAxisLabel = true;
    yAxisLabel = 'committed';
    xAxisLabel = 'used';
    view: any[];
    data: any[] = [];
    verticalOrientation = false;
    colorScheme: any = {
        domain: ['#0d5481', '#0AFF16']
    };
    POLL_INTERVAL = 15000;

    subscription: any;


    constructor(protected _runtimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                protected _barChartService: BarChartService,
                private _changeDetectionRef: ChangeDetectorRef,
                protected _optionsService: OptionsService,
                private _route: Router) {
        super(_runtimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef,
            _optionsService);

    }

    public preRun(){

    }

    public run() {

        this.data = [];
        this.initializeRunState(true);
        this.updateData(null);

    }

    public stop() {

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
        this._route.navigate(['/detail'], {});
    }

    public updateProperties(updatedProperties: any) {

        /**
         * todo
         *  A similar operation exists on the procmman-config-service
         *  whenever the property page form is saved, the in memory board model
         *  is updated as well as the gadget instance properties
         *  which is what the code below does. This can be eliminated with code added to the
         *  config service or the property page service.
         *
         * **/

        const updatedPropsObject = JSON.parse(updatedProperties);

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

    ngOnDestroy() {

        this.stop();
    }
}
