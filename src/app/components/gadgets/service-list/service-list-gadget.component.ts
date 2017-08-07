import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {
    style, trigger, animate, transition
} from '@angular/animations';

import {RuntimeService} from '../../../services/runtime.service';
import {serviceList} from './service-list';
import {GadgetInstanceService} from '../../board/grid-manager/grid.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {EndPointService} from '../../board/board-configuration/tab-endpoint/endpoint.service';
import {GadgetBase} from '../_common/gadget-base';


@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: 'view.html',
    styleUrls: ['../_common/styles-gadget.css'],
    animations: [
        trigger(
            'showHideAnimation',
            [
                transition(':enter', [   // :enter is alias to 'void => *'
                    style({opacity: 0}),
                    animate(1000, style({opacity: 1}))
                ]),
                transition(':leave', [   // :leave is alias to '* => void'
                    animate(1000, style({opacity: 0}))

                ])
            ])]
})
export class ServiceListGadgetComponent extends GadgetBase implements OnDestroy {

    // runtime document subscription
    subscriptionDocument: any;
    webSocketConnection: any;

    // todo just realy on json
    serviceList: {
        active: boolean,
        applicationName: string,
        description: string,
        icon: string,
        pseudoName: string,
        processId: string }[] = [];

    constructor(protected _procMonRuntimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                private _changeDetectionRef: ChangeDetectorRef) {
        super(_procMonRuntimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef);

        Object.assign(this, {serviceList});

    }

    public preRun(): void {
    }

    public run() {
        this.errorExists = false;
        this.actionInitiated = true;
        /*
        this._procMonRuntimeService.postForXmonSessionStart({
            url: this.endpointObject.address,
            user: this.endpointObject.user,
            password: this.endpointObject.credential
        }, this.endpointObject.description,
            this.endpointObject.address).subscribe(subscriptionDocument => {

                this.subscriptionDocument = subscriptionDocument;
                subscriptionDocument.session.event.metrics.ecx_processes.subscribe = true;

                this._procMonRuntimeService.subscribeToMetricWithSubdoc(subscriptionDocument,
                    subscriptionDocument.session.node.info.monsid,
                    this.endpointObject.description,
                    this.endpointObject.address).subscribe(subscriptionData => {

                        this.webSocketConnection = this._procMonRuntimeService.getData(subscriptionDocument.session.node.info.monsid,
                            subscriptionDocument.session.node.info.roomNum,
                            this.endpointObject.address).subscribe(results => {

                                // todo - check for {ok,ok}
                                const me = this;
                                this.actionInitiated = false;
                                this.inRun = true;

                                results.forEach(function (item) {
                                    if (item.name.toString().includes('event.ecx_processes')) {
                                        me.updateData(item.sample[0].data);
                                    }
                                });
                            },
                            error => this.handleError(error),
                            () => console.debug('Connecting to web socket'));
                    },
                    error => this.handleError(error),
                    () => console.debug('Connecting to websocket/room!'));
            },
            error => this.handleError(error),
            () => console.debug('Connecting to server!'));
        */
    }

    public stop() {
        this.errorExists = false;
        this.inRun = false;
        this.actionInitiated = true;

        this.subscriptionDocument.session.event.metrics.ecx_processes.subscribe = false;

        this._procMonRuntimeService.subscribeToMetricWithSubdoc(
            this.subscriptionDocument,
            this.subscriptionDocument.session.node.info.monsid,
            this.endpointObject.description,
            this.endpointObject.address).subscribe(subscriptionData => {

                this.unSubscribeToWebSocketObservable();

                serviceList.forEach(function (service) {
                    service.processId = '';
                });

            },
            error => this.handleError(error),
            () => console.log('Closing Process Subscription!'));


    }

    public updateData(data: any[]) {

        data.forEach(function (item) {

            serviceList.forEach(function (service) {

                if (item.toString().includes(service.pseudoName)) {
                    service.active = true;
                    service.processId = item.toString().split(':')[0];

                }
            });
        });

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

        this.setEndPoint(updatedPropsObject.endpoint);

        this.showOperationControls = true;

    }

    public ngOnDestroy() {

        this.unSubscribeToWebSocketObservable();

    }

    private unSubscribeToWebSocketObservable() {

        if (this.webSocketConnection) {
            this.webSocketConnection.unsubscribe();
        }
        this.actionInitiated = false;

    }
}
