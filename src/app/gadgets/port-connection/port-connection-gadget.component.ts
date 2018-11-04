import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {GadgetInstanceService} from '../../grid/grid.service';
import {GadgetBase} from '../_common/gadget-base';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {ConnectionService} from './service';
import {EndPointModel} from "./service.model";
import {OptionsService} from "../../configuration/tab-options/service";


@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-gadget.css']


})
export class PortConnectionGadgetComponent extends GadgetBase implements OnDestroy {

    host: string;
    port: string;
    endPoints: Array<any> = [];
    testResultData: Array<any> = [];
    topic: any;

    constructor(protected _procMonRuntimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                private _changeDetectionRef: ChangeDetectorRef,
                protected _connectionService: ConnectionService,
                protected _optionsService: OptionsService) {
        super(_procMonRuntimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef,
            _optionsService);

    }

    public preRun(): void {
        this.port = this.getPropFromPropertyPages('port');
        this.host = this.getPropFromPropertyPages('host');
        this.setTopic();
    }

    public run() {
        /** todo - add a one second delay to give the appearance
         *  of something happening when there are two subsequent tests that
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

        /**
         * todo:refactor - the requests that include multiple ports are submitted in a loop to avoid requests who's host will
         * fail due to a timeout. If there are multiple endpoints being tested at the same time
         * an accumulation of timeouts will exceed the 30 second connection response window that when hit
         * will result in a 503 from the server.
         */
        this.endPoints.forEach(function (endpoint) {

            let endpointInstance = [];
            endpointInstance.push(endpoint);

            /**
             * todon- consider adding a bit of delay between requests
             */
            me._connectionService.testConnectivity(endpointInstance).subscribe(
                data => {

                    me.testResultData.push(...data);
                    me.stop();

                },
                error => me.handleError(error));
        });
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

    public setUpEndPoints() {

        this.clearState();

        let ports: Array<string>;

        ports = this.port.split(",");

        const me = this;

        ports.forEach(function (port) {

            me.endPoints.push(new EndPointModel(me.host.trim(), port.trim()));

        });

    }

    public setTopic() {

            this.topic = {
                "concept": {
                    "id": "c_network_test_tool",
                    "xml:lang": "en-us",
                    "title": "Network Test Connectivity Tool",
                    "shortdesc": "The Network Test Connectivity tool tests host addresses and ports to determine if a connection can be established. If a connection can be established, the tool returns a green checkmark. If a connection cannot be established, the raw error condition displays, along with possible causes and actions.",
                    "conbody": {
                        "p": [
                            "The Network Test Connectivity tool can provide guidance for the following error conditions:",
                            {
                                "ul": {
                                    "id": "ul_k5c_qdl_r2b",
                                    "li": [
                                        "time out",
                                        "connection refused",
                                        "unknown host",
                                        "no route",
                                        "unreachable host"
                                    ]
                                }
                            }
                        ]
                    }
                }
            }

    }

    ngOnDestroy() {

    }
}
