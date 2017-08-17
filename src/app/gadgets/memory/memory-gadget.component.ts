import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {GadgetInstanceService} from '../../board/grid/grid.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetBase} from '../_common/gadget-base';

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-gadget.css']
})

export class MemoryGadgetComponent extends GadgetBase implements OnDestroy {

    // chart options
    view: any[];
    colorScheme = {
        domain: ['#A13F51', '#5AA454', '#C7B42C']
    };

    currentValue = '0';
    previousValue = '0';
    subscriptionDocument: any;
    webSocketConnection: any;


    constructor(protected _runtimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                private _changeDetectionRef: ChangeDetectorRef) {
        super(_runtimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef);

    }

    public preRun(): void {
    }

    public run() {


        this.errorExists = false;
        this.actionInitiated = true;

        this._runtimeService.postForXmonSessionStart({
            url: this.endpointObject.address,
            user: this.endpointObject.user,
            password: this.endpointObject.credential
        }, this.endpointObject.description, this.endpointObject.address).subscribe(subscriptionDocument => {

                this.subscriptionDocument = subscriptionDocument;

                subscriptionDocument.session.node.metrics.mem_util.subscribe = true;

                this._runtimeService.subscribeToMetricWithSubdoc(subscriptionDocument,
                    subscriptionDocument.session.node.info.monsid,
                    this.endpointObject.description,
                    this.endpointObject.address).subscribe(subscriptionData => {

                        this.webSocketConnection = this._runtimeService.getData(subscriptionDocument.session.node.info.monsid,
                            subscriptionDocument.session.node.info.roomNum,
                            this.endpointObject.address).subscribe(results => {

                                const me = this;

                                this.actionInitiated = false;
                                this.inRun = true;

                                if (results instanceof Array) {
                                    results.forEach(function (item) {
                                        if (item.name.toString().includes('node.mem_util')) {
                                            me.updateData(item.sample[0].data);
                                        }
                                    });
                                }
                            },
                            error => this.handleError(error),
                            () => console.debug('Connecting to web socket'));
                    },
                    error => this.handleError(error),
                    () => console.debug('Establishing socket session via post'));
            },
            error => this.handleError(error),
            () => console.debug('Initial ECX Mon Connection Established'));
    }

    public stop() {
        this.errorExists = false;
        this.inRun = false;
        this.actionInitiated = true;

        this.subscriptionDocument.session.node.metrics.mem_util.subscribe = false;
        this._runtimeService.subscribeToMetricWithSubdoc(
            this.subscriptionDocument,
            this.subscriptionDocument.session.node.info.monsid,
            this.endpointObject.description,
            this.endpointObject.address).subscribe(subscriptionData => {

                this.unSubscribeToWebSocketObservable();

            },
            error => this.handleError(error),
            () => console.debug('Closing Memory Subscription'));

    }

    public updateData(data: any[]) {

        if (Number(this.currentValue) > Number(this.previousValue)) {
            this.previousValue = this.currentValue;
        }

        this.currentValue = Number(data[0]) + '';
        this.showOperationControls = true;

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
