import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {GadgetInstanceService} from '../../grid/grid.service';
import {RuntimeService} from '../../services/runtime.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetBase} from '../_common/gadget-base';
import {BubbleService} from './service';
import {Router} from '@angular/router';
import {OptionsService} from "../../configuration/tab-options/service";

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-gadget.css']
})

export class BubbleGadgetComponent extends GadgetBase {

    // chart options
    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = true;
    showXAxisLabel = true;
    showYAxisLabel = true;
    yAxisLabel = 'Available';
    xAxisLabel = 'Total';
    view: any[];
    data: any[] = [];
    colorScheme: any = {
        domain: ['#00ff00', '#4800ff', '#4894FF', '#AF0854']
    };


    constructor(protected _runtimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                protected _bubbleService: BubbleService,
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

    public preRun(): void {

        // this.run();
    }

    public run() {

        this.data = [];
        this.initializeRunState(true);
        this.updateData(null);

    }

    public stop() {
        this.setStopState(false);
    }

    public updateData(_data: any[]) {

        this._bubbleService.getMockData().subscribe(data => {

                Object.assign(this, {data});

                console.log(data);

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

        /*
        this.title = updatedPropsObject.title;
        this.showXAxis = updatedPropsObject.chart_properties;
        this.showYAxis = updatedPropsObject.chart_properties;
        this.gradient = updatedPropsObject.chart_properties;
        this.showLegend = updatedPropsObject.chart_properties;
        this.showXAxisLabel = updatedPropsObject.chart_properties;
        this.showYAxisLabel = updatedPropsObject.chart_properties;
        */

        this.setEndPoint(updatedPropsObject.endpoint);

        this.showOperationControls = true;

    }

}
