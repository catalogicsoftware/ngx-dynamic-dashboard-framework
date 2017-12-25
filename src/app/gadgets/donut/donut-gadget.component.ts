import {
    ChangeDetectorRef, Component
} from '@angular/core';

import {
    style, trigger, animate, transition, state
} from '@angular/animations';

import {RuntimeService} from '../../services/runtime.service';
import {GadgetInstanceService} from '../../board/grid/grid.service';
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
export class DonutGadgetComponent extends GadgetBase {

    topic: any;
    data = {};

    legendTitle = 'Protection';
    badColorScheme = {
        domain: ['#a10910', '#DDDDDD']
    };
    goodColorScheme = {
        domain: ['#00c700', '#DDDDDD']
    };
    vms: any;

    detailMenuOpen: string;
    threshold: string;
    objectLabelVal1 = 'Protected';
    objectLabelVal2 = 'UnProtected';
    objectCountAPI: string;
    objectSuccessCountAPI: string;
    apiBase: string;

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

    }

    public run() {
        this.initializeRunState(false);
        this.updateData(null);
    }

    public stop() {
        this.setStopState(false);
    }

    private setSessionId() {

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
                    this._apiTokenService.setAPIToken(data[this.endpointObject.tokenAPIProperty]);
                    console.log('Donut Endpoint tokenKey: ' + data[this.endpointObject.tokenAPIProperty]);
                },
                error => {

                    // handle error condition
                    console.error('PRERUN - Error getting API token!!!')
                    console.error(error);

                });
        } else {
            // issue a warning and instruction
            console.log('PRERUN - Endpoint not configured!!!');
        }
    }

    private getData() {

        console.log('Attempting to get live data');

        this.setInRunState();

        if (this._apiTokenService.getAPIToken()) {

            console.log('Attempting to get success data');
            this._donutService.getSuccessCategoryObjectCount(
                this._apiTokenService.getAPIToken(),
                this.endpointObject.tokenAPIHeader,
                this.endpointObject.address,
                this.apiBase + this.objectSuccessCountAPI
            ).subscribe(successData => {

                    console.log('Success count returned!!!');
                    console.log(successData);
                    /**
                     * todo
                     */
                    // me.objectSuccessCount = successData['total'];

                },
                error => {
                    console.error('Error getting successful count!');
                    console.error(error);
                });


            console.log('Attempting to get total data');

            this._donutService.getTotalObjectCount(
                this._apiTokenService.getAPIToken(),
                this.endpointObject.tokenAPIHeader,
                this.endpointObject.address,
                this.apiBase + this.objectCountAPI
            ).subscribe(totalData => {
                console.log('Total count returned!!!');
                console.log(totalData);
                /**
                 *
                 * todo
                 */
                // me.objectCount = totalData['total'];
            }, error => {
                console.error('Error getting object count!');
                console.error(error);
            });
        } else {

            console.log('API Token not defined');

            this.setSessionId();
        }
    }

    public updateData(data: any[]) {

        console.log('GETTING MOCK DATA');

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

        this.apiBase = updatedPropsObject.base;
        this.objectCountAPI = updatedPropsObject.total;
        this.objectSuccessCountAPI = updatedPropsObject.good;
        this.threshold = updatedPropsObject.threshold;
        this.title = updatedPropsObject.title;
        this.setEndPoint(updatedPropsObject.endpoint);

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
        this.apiBase = this.getPropFromPropertyPages('base');
        this.objectCountAPI = this.getPropFromPropertyPages('total');
        this.objectSuccessCountAPI = this.getPropFromPropertyPages('good');
        this.title = this.getPropFromPropertyPages('title');
        this.detailMenuOpen = 'out';

    }

    toggleAcordion(): void {

        this.detailMenuOpen = this.detailMenuOpen === 'out' ? 'in' : 'out';

    }
}
