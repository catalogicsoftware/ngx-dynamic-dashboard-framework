import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {GadgetInstanceService} from '../../board/grid-manager/grid.service';
import {RuntimeService} from '../../../services/runtime.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {EndPointService} from '../../board/board-configuration/tab-endpoint/endpoint.service';
import {GadgetBase} from '../_common/gadget-base';

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: 'view.html',
    styleUrls: ['../_common/styles-gadget.css']
})

export class CPUGadgetComponent extends GadgetBase implements OnDestroy, OnInit {

    // chart options
    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = false;
    showXAxisLabel = true;
    showYAxisLabel = false;
    yAxisLabel = 'Available CPUs';
    xAxisLabel = 'Percent Utilization';
    view: any[];
    cpu: any[] = [];
    colorScheme: any = {
        domain: ['#0d5481', '#0AFF16']
    };

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

        this.updateData([{0: 0}, {0: 0}, {0: 0}]);

        this._runtimeService.postForXmonSessionStart({
                url: this.endpointObject.address,
                user: this.endpointObject.user,
                password: this.endpointObject.credential
            },
            this.endpointObject.description,
            this.endpointObject.address).subscribe(subscriptionDocument => {

                this.subscriptionDocument = subscriptionDocument;

                subscriptionDocument.session.node.metrics.cpu_util.subscribe = true;

                this._runtimeService.subscribeToMetricWithSubdoc(subscriptionDocument,
                    subscriptionDocument.session.node.info.monsid,
                    this.endpointObject.description,
                    this.endpointObject.address)
                    .subscribe(subscriptionData => {

                            this.webSocketConnection = this._runtimeService.getData(subscriptionDocument.session.node.info.monsid,
                                subscriptionDocument.session.node.info.roomNum,
                                this.endpointObject.address).subscribe(results => {

                                    const me = this;

                                    this.actionInitiated = false;
                                    this.inRun = true;
                                    // the results from Paul's service is an array
                                    if (results instanceof Array) {
                                        results.forEach(function (item) {
                                            if (item.name.toString().includes('node.cpu_util')) {
                                                me.updateData(item.sample[0].data);
                                            }
                                        });
                                    }
                                },
                                error => this.handleError(error),
                                () => console.info('Connecting  to web socket'));
                        },
                        error => this.handleError(error),
                        () => console.debug('Establishing socket session via post'));

                console.debug('Return after disconnecting from remote socket');
            },
            error => this.handleError(error),
            () => console.debug('Initial ECX Mon Connection Established'));

    }

    public stop() {
        this.errorExists = false;
        this.inRun = false;
        this.actionInitiated = true;

        this.subscriptionDocument.session.node.metrics.cpu_util.subscribe = false;
        this._runtimeService.subscribeToMetricWithSubdoc(
            this.subscriptionDocument,
            this.subscriptionDocument.session.node.info.monsid,
            this.endpointObject.description,
            this.endpointObject.address).subscribe(subscriptionData => {

                this.unSubscribeToWebSocketObservable();

            },
            error => this.handleError(error),
            () => console.debug('Closing CPU Subscription'));

    }

    public updateData(data: any[]) {

                const BreakException = {};

                const cpu: any[] = [];

                let idx = 0;
                try {// todo - improve this
                    data.forEach(function (item) {

                        let name = '';
                        switch (idx) {
                            case  0 : {
                                name = 'Total';
                                break;
                            }
                            case  1 : {
                                name = 'System';
                                break;
                            }
                            case 2: {
                                name = 'User';
                                break;
                            }
                        }


                        const _data = {
                            'name': name,
                            'series': []
                        };

                        const info = {};
                        const _series = [];
                        info['name'] = 'used';
                        info['value'] =  (1 - parseFloat(item)).toFixed(2);


                        _series.push(Object.assign({}, info));

                        const info2 = {};
                        info2['name'] = 'available';
                        info2['value'] =  (1 - parseFloat(item)).toFixed(2);


                        _series.push(Object.assign({}, info2));

                        _data.series = _series;
                        cpu.push(Object.assign({}, _data));

                        idx++;

                        if (idx === 3) {
                            throw BreakException;
                        }

                    });
                } catch (e) {
                    if (e !== BreakException) {
                        throw e;
                    }
                }

                Object.assign(this, {cpu});
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

    }

    public ngOnDestroy() {

        this.unSubscribeToWebSocketObservable();

    }

    private unSubscribeToWebSocketObservable() {

        if (this.webSocketConnection) {
            this.webSocketConnection.unsubscribe();
        }
        this.actionInitiated = false;
        this.inRun = false;
    }

}
