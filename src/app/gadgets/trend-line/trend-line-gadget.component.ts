import {ChangeDetectorRef, Component} from '@angular/core';
import {GadgetInstanceService} from '../../grid/grid.service';
import {RuntimeService} from '../../services/runtime.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetBase} from '../_common/gadget-base';
import {TrendLineService} from './service';
import {OptionsService} from "../../configuration/tab-options/service";

declare var d3: any;

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-gadget.css']
})

export class TrendLineGadgetComponent extends GadgetBase {


    topic: any;

    // chart options
    showXAxis  = true;
    showYAxis  = true;
    gradient  = true;
    showLegend  = true;
    showXAxisLabel  = true;
    showYAxisLabel  = true;
    yAxisLabel  = 'IOPS';
    xAxisLabel  = 'Time';
    autoScale = true;
    view: any[];
    colorScheme: any = {
        domain: ['#2185D0', '#0AFF16']
    };

    d3 = d3;
    multi: any[] = [];

    collectors: Array<string> = [];

    eventTimerSubscription: any;

    constructor(protected _trendLineService: TrendLineService,
                protected _runtimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                protected _changeDetectionRef: ChangeDetectorRef,
                protected _optionsService: OptionsService) {
        super(_runtimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef,
            _optionsService);


    }


    public preRun(): void {

        this.setHelpTopic();
        /**
         * todo - get collectors from property page data
         * @type {[string,string]}
         */
        this.collectors = ['read', 'write'];

        for (let y = 0; y < this.collectors.length; y++) {

            this.multi[y] = {
                'name': this.collectors[y],
                'series': TrendLineService.seedData()
            };
        }
    }

    public run() {
        this.initializeRunState(true);
        this.updateData();

    }

    public stop() {
        this.setStopState(false);
        this._trendLineService.stop(this.eventTimerSubscription);
    }

    public updateData() {

        this.eventTimerSubscription = this._trendLineService.get(this.collectors).subscribe(data => {

                for (let x = 0; x < this.collectors.length; x++) {

                    this.multi[x].series.shift();
                    this.multi[x].series.push(data[x]);

                }

                this.multi = [...this.multi];
            },
            error => this.handleError(error));
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
        this.showXAxis = updatedPropsObject.chart_properties;
        this.showYAxis = updatedPropsObject.chart_properties;
        this.gradient = updatedPropsObject.chart_properties;
        this.showLegend = updatedPropsObject.chart_properties;
        this.showXAxisLabel = updatedPropsObject.chart_properties;
        this.showYAxisLabel = updatedPropsObject.chart_properties;

        this.setEndPoint(updatedPropsObject.endpoint);

        this.showOperationControls = true;

        /**
         * todo - adjust collectors from property page data
         * @type {[string,string]}
         */

    }

    private setHelpTopic() {
        this._trendLineService.getHelpTopic().subscribe(data => {

            this.topic = data;

        });
    }

}
