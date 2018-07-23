import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {GadgetInstanceService} from '../../grid/grid.service';
import {GadgetBase} from '../_common/gadget-base';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {ConnectionService} from './service';
import {EndPointModel} from "./service.model";


@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-gadget.css'],
    animations: [

        trigger(
            'fade',
            [
                transition(':enter', [   // :enter is alias to 'void => *'
                    style({opacity: 0}),
                    animate(1000, style({opacity: 1}))
                ]),
                transition(':leave', [   // :leave is alias to '* => void'
                    animate(300, style({opacity: 0}))
                ])
            ])
    ]

})
export class ResponseTimeGadgetComponent extends GadgetBase implements OnDestroy {

    host: string;
    port: string;
    endPoints:Array<any> = [];

    //new data object
    testResultData: Array<any> = [];


    constructor(protected _procMonRuntimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                private _changeDetectionRef: ChangeDetectorRef,
                protected _connectionService: ConnectionService) {
        super(_procMonRuntimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef);

    }

    public preRun(): void {
        this.port = this.getPropFromPropertyPages('port');
        this.host = this.getPropFromPropertyPages('host');

    }

    public run() {
        /** todo - add a one second delay to give the appearance of something hapenning when there are two subsequent tests that
         *  have the same result
         */
        this.setUpEndPoints();
        this.initializeRunState(false);
        this.testConnection();
        this.inRun = true;
    }

    public stop() {
        this.setStopState(false);
    }

    public testConnection() {

       const me = this;

        this._connectionService.testConnectivity(this.endPoints).subscribe(
            data => {

                this.testResultData = data.slice();

                console.log (this.testResultData);

                me.stop();

            },
            error => this.handleError(error));
    }


    private clearState() {
        this.testResultData.length = 0;
        this.endPoints.length = 0;
    }

    public updateData(data: any[]) {
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


        this.port = updatedPropsObject.port;
        this.host = updatedPropsObject.host;
        this.title = updatedPropsObject.title;
        this.showOperationControls = true;

    }

    public setUpEndPoints(){

        this.clearState();

        let ports = this.port.split(",");

        const me = this;

        ports.forEach(function (port) {

            me.endPoints.push(new EndPointModel(me.host, port));

        });

    }


    ngOnDestroy() {

    }
}
