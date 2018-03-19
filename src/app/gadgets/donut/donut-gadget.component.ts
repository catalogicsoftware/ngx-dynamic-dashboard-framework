import {
    ChangeDetectorRef, Component, OnDestroy
} from '@angular/core';

import {
    style, trigger, animate, transition, state
} from '@angular/animations';

import {RuntimeService} from '../../services/runtime.service';
import {GadgetInstanceService} from '../../grid/grid.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {GadgetBase} from '../_common/gadget-base';
import {DonutService} from './service';
import {APITokenService} from '../../api-token/api-token.service';


@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-gadget.css'],
    animations: [

        trigger('accordion', [
            state('in', style({
                height: '*'
            })),
            state('out', style({
                opacity: '0',
                height: '0px'
            })),
            transition('in => out', animate('700ms ease-in-out')),
            transition('out => in', animate('300ms ease-in-out'))
        ]),
        trigger('accordion2', [
            state('in', style({
                height: '*'
            })),
            state('out', style({
                opacity: '0',
                height: '0px'
            })),
            transition('in => out', animate('300ms ease-in-out')),
            transition('out => in', animate('800ms ease-in-out'))
        ])
    ]
})
export class DonutGadgetComponent extends GadgetBase implements OnDestroy {

    topic: any;
    data = {};

    showOperationControls = true;

    badColorScheme = {
        domain: ['#a10910', '#ffff00', '#DDDDDD']
    };
    goodColorScheme = {
        domain: ['#00c700', '#ffff00', '#DDDDDD']
    };
    vms: any;

    detailMenuOpen: string;
    threshold: string;

    // chart counts and labels
    passCount = 0;
    warnCount = 0;
    todoCount = 1;

    passChartLabel = 'Passed';
    warnChartLabel = 'Staged';
    todoChartLabel = 'ToDo';


    // API paths
    apiBasePath: string;
    passAPI: string;
    warnAPI: string;
    todoAPI: string;


    donutServiceSubscription: any;

    colorScheme = this.goodColorScheme;

    constructor(protected _runtimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                protected _changeDetectionRef: ChangeDetectorRef,
                protected _donutService: DonutService,
                protected  _apiTokenService: APITokenService) {
        super(_runtimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef);

    }

    public preRun(): void {

        console.log('PRERUN');

        this.setTopic();
        this.setProperties();
        this.setChartData();

    }

    public run() {

        this.initializeRunState(false);

        // process objects - take non successful objects and submit them to api for processing

        this.updateData(null);
    }

    public stop() {

        if (this.donutServiceSubscription) {
            this.donutServiceSubscription.unsubscribe();
        }
        this.setStopState(false);

    }

    private setAPIToken() {

        console.log('Attempting to get get API token');

        if (this.endpointObject && this.endpointObject.address) {

            console.log('Endpoint Found');
            /**
             * todo - this should really be done in pre run. However, there is  currently an issue where Pre-Run is called twice
             * so this needs to be refactored.
             */
            this._apiTokenService.getAPITokenForCredentials({
                'url': this.endpointObject.address + this.endpointObject.tokenAPI,
                'user': this.endpointObject.user,
                'password': this.endpointObject.credential
            }).subscribe(data => {

                    const apiToken = data[this.endpointObject.tokenAPIProperty];

                    this._apiTokenService.setAPIToken(apiToken);

                    this._donutService.setAPIBaseDetails(
                        apiToken,
                        this.endpointObject.tokenAPIHeader,
                        this.endpointObject.address,
                        this.apiBasePath);


                    console.log('Donut Endpoint tokenKey: ' + apiToken);
                },
                error => {

                    // handle error condition
                    console.error('PRERUN - Error getting API token!!!');
                    console.error(error);

                });
        } else {
            // issue a warning and instruction
            console.log('PRERUN - Endpoint not configured!!!');
        }
    }


    public updateData(data: any[]) {

        console.log('GETTING MOCK DATA');

        /**
         * todo - add an option to run this method in simulation mode
         */

        /*
            this._donutService.getMockData(this.objectLabelVal1, this.objectLabelVal2).subscribe(_data => {

                this.data = _data;

                console.log('Mock Data Returned');

                const thresholdVal = Number(this.threshold);

                if (this.data[0].value < thresholdVal) {
                    this.colorScheme = this.goodColorScheme;
                } else {
                    this.colorScheme = this.badColorScheme;
                }

                // get real data
                this.getData();
            },
            error => this.handleError(error));

        */

        this.donutServiceSubscription = this._donutService.poll().subscribe(_data => {

                console.log('Attempting to get live data');

                const me = this;

                if (this._apiTokenService.getAPIToken()) { // todo - handle token expiration

                    console.log('Attempting to get success count!');

                    this._donutService.getPassCount().subscribe(passCount => {

                            if (passCount['results'].length) {
                                me.passCount = passCount['results'][0]['count'];

                                console.log('Attempting to get to do count!');
                            }
                            this._donutService.getToDoCount().subscribe(todoCount => {

                                if (todoCount['results'].length) {

                                    me.todoCount = todoCount['results'][0]['count'];
                                    me.setChartData();
                                }

                                this.setInRunState();

                            }, error => {
                                console.error('Error getting to do count!');
                                me.handleError(error);
                            });

                        },
                        error => {
                            console.error('Error getting pass count!');
                            console.log(error);
                            me.handleError(error);
                        });


                } else {

                    console.log('API Token not defined');

                    this.setAPIToken();
                }
            },
            error => this.handleError(error));
    }


    /**
     * this is called when the property page is configured and saved
     * @param updatedProperties
     */
    public updateProperties(updatedProperties: any) {

        console.log('UPDATE PROPERTIES');

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

        this.apiBasePath = updatedPropsObject.apiBasePath;
        this.passAPI = updatedPropsObject.passAPI;
        this.warnAPI = updatedPropsObject.warnAPI;
        this.todoAPI = updatedPropsObject.todoAPI;


        this.threshold = updatedPropsObject.threshold;
        this.title = updatedPropsObject.title;

        this.setEndPoint(updatedPropsObject.endpoint);
        this.setAPIInService();


        this.showOperationControls = true;


    }

    setTopic() {
        this._donutService.getHelpTopic().subscribe(data => {
            this.topic = data;
        });
    }

    /**
     * this is called when the gadget already has been configured on the board
     *
     */
    public setProperties() {

        this.threshold = this.getPropFromPropertyPages('threshold');
        this.apiBasePath = this.getPropFromPropertyPages('apiBasePath');
        this.passAPI = this.getPropFromPropertyPages('passAPI');
        this.warnAPI = this.getPropFromPropertyPages('warnAPI');
        this.todoAPI = this.getPropFromPropertyPages('todoAPI');
        this.title = this.getPropFromPropertyPages('title');
        this.detailMenuOpen = 'out';
        this.setAPIInService();
    }

    private setChartData() {

        this.data = [
            {
                'name': this.passChartLabel,
                'value': this.passCount
            },
            {
                'name': this.warnChartLabel,
                'value': this.warnCount
            },
            {
                'name': this.todoChartLabel,
                'value': this.todoCount - (this.passCount + this.warnCount)
            }
        ];

        if (this.data[0].value < this.threshold) {
            this.colorScheme = this.goodColorScheme;
        } else {
            this.colorScheme = this.badColorScheme;
        }
    }

    setAPIInService() {

        this._donutService.setAPIs(
            this.passAPI,
            this.warnAPI,
            this.todoAPI);

    }

    toggleAccordion(): void {

        this.detailMenuOpen = this.detailMenuOpen === 'out' ? 'in' : 'out';

    }

    public ngOnDestroy() {

        this.stop();

    }
}
