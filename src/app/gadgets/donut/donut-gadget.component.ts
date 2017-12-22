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
    showOperationControls = false;
    data: any;
    threshold: string;

    legendTitle = 'Protection';
    badColorScheme = {
        domain: ['#a10910', '#DDDDDD']
    };
    goodColorScheme = {
        domain: ['#00c700', '#DDDDDD']
    };
    vms: any;
    detailMenuOpen: string;

    objectLabelVal1 = 'Protected';
    objectLabelVal2 = 'UnProtected';
    objectCount: string;
    objectCountAPI: string;
    objectSuccessCount: string;
    objectSuccessCountAPI: string;

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


        if (this.endpointObject && this.endpointObject.address) {
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
            });
        }

        this.run();
        this.setTopic();
    }


    public preRun(): void {

        this.threshold = this.getPropFromPropertyPages('threshold');
        this.detailMenuOpen = 'out';
    }


    public run() {
        this.data = [];
        this.initializeRunState(true);
        this.updateData(null);
    }

    public stop() {
        this.setStopState(false);
    }

    public updateData(data: any[]) {

        const me = this;

        this._donutService.getMockData(this.objectLabelVal1, this.objectLabelVal2).subscribe(_data => {
                this.data = _data;

                const thresholdVal = Number(this.threshold);

                if (this.data[0].value < thresholdVal) {
                    this.colorScheme = this.goodColorScheme;
                } else {
                    this.colorScheme = this.badColorScheme;
                }
            },
            error => this.handleError(error));

        if (this.endpointObject && this.endpointObject.address) {
            this._donutService.getSuccessCategoryObjectCount(
                this._apiTokenService.getAPIToken(),
                this.endpointObject.tokenAPIHeader,
                this.endpointObject.address,
                this.objectSuccessCountAPI
            ).subscribe(successData => {

                /**
                 * todo
                 */
                me.objectSuccessCount = successData['total'];

            });

            this._donutService.getTotalObjectCount(
                this._apiTokenService.getAPIToken(),
                this.endpointObject.tokenAPIHeader,
                this.endpointObject.address,
                this.objectCountAPI
            ).subscribe(totalData => {

                /**
                 *
                 * todo
                 */
                me.objectCount = totalData['total'];
            });
        }
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

        this.threshold = updatedPropsObject.threshold;
        this.title = updatedPropsObject.title;
        this.setEndPoint(updatedPropsObject.endpoint);

        this.run();


    }

    setTopic() {
        this._donutService.getHelpTopic().subscribe(data => {

            this.topic = data;

        });
    }

    toggleAcordion(): void {

        this.detailMenuOpen = this.detailMenuOpen === 'out' ? 'in' : 'out';

    }
}
