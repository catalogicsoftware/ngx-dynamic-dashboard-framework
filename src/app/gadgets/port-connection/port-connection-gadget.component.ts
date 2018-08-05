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

            me.endPoints.push(new EndPointModel(me.host, port));

        });

    }

    public setTopic() {

            this.topic = {
                "concept": {
                    "id": "c_spp_alerts",
                    "xml:lang": "en-us",
                    "rev": "rev1v102",
                    "title": "Port Connectivity Test Tool",
                    "titlealts": {
                        "navtitle": "Alerts",
                        "searchtitle": "IBM Spectrum Protect Plus dashboard"
                    },
                    "shortdesc": {
                        "content": [
                            "The",
                            "tool is used to check connectivity to a remote server",
                            "environment. The number of alerts\ndisplay in a red circle, indicating that alerts are available to view."
                        ],
                        "uicontrol": "Alerts",
                        "keyword": {"conref": "../common/reuse_keyword.dita#kwd/ispplus"}
                    },
                    "conbody": {
                        "p": [
                            {
                                "content": [
                                    "Click the",
                                    "menu to view the alerts list. Each item in the list\nincludes a status icon, a summary of the alert, the time the associated warning or error occurred,\nand a link to view associated logs."
                                ],
                                "uicontrol": "Alerts"
                            },
                            "The following alert types display in the alert list:",
                            {
                                "dl": {
                                    "dlentry": {
                                        "dt": "Alert types",
                                        "dd": {
                                            "dl": [
                                                {
                                                    "dlentry": {
                                                        "dt": {"b": "Job failed"},
                                                        "dd": "Displays when a job fails with critical errors or wholly fails to complete."
                                                    }
                                                },
                                                {
                                                    "dlentry": [
                                                        {
                                                            "dt": {"b": "System disk space low"},
                                                            "dd": {
                                                                "content": [
                                                                    "Displays when the amount of data consumed by the catalog on an",
                                                                    "data disk exceeds the assigned 5% threshold."
                                                                ],
                                                                "keyword": {"conref": "../common/reuse_keyword.dita#kwd/ispplus"}
                                                            }
                                                        },
                                                        {
                                                            "dt": {"b": "vSnap storage space low"},
                                                            "dd": "Displays when the amount of free disk space on a vSnap server is less than 5%."
                                                        },
                                                        {
                                                            "dt": {"b": "System memory low"},
                                                            "dd": {
                                                                "content": [
                                                                    "Displays when the amount of memory available to run",
                                                                    "is less than 5%."
                                                                ],
                                                                "keyword": {"conref": "../common/reuse_keyword.dita#kwd/ispplus"}
                                                            }
                                                        },
                                                        {
                                                            "dt": {"b": "System CPU usage high"},
                                                            "dd": "Displays when the IBM Spectrum Protect Plus processor usage exceeds the assigned 5% threshold."
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            };

    }

    ngOnDestroy() {

    }
}
