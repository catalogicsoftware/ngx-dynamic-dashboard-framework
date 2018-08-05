import {ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {
    style, trigger, animate, transition, state
} from '@angular/animations';

import {RuntimeService} from '../../services/runtime.service';
import {serviceList} from './service-list';
import {GadgetInstanceService} from '../../grid/grid.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetBase} from '../_common/gadget-base';
import {EdgeService} from './service';
import {OptionsService} from "../../configuration/tab-options/service";

declare var jQuery: any;

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-gadget.css'],
    animations: [
        trigger(
            'showHideAnimation',
            [
                transition(':enter', [   // :enter is alias to 'void => *'
                    style({opacity: 0}),
                    animate(3000, style({opacity: 1}))
                ]),
                transition(':leave', [   // :leave is alias to '* => void'
                    animate(3000, style({opacity: 0}))

                ])
            ]),
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
        ])]
})
export class EdgeServiceListGadgetComponent extends GadgetBase implements OnDestroy {
    // chart options
    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = false;
    showXAxisLabel = true;
    showYAxisLabel = true;
    yAxisLabel = 'Tasks';
    xAxisLabel = 'Proxies';
    view: any[] = [700, 200];
    single: any [];
    colorScheme: any = {
        domain: ['#0d5481', '#0AFF16', '#da871e', '#D449E1']
    };

    remoteService: any;
    detailMenuOpen: string;

    // todo just realy on json
    edgeServiceList: {
        active: boolean,
        host: string,
        port: number,
        metaData: any,
        uri: string,
        serviceId: string,
        status: string,
        runningTaskCount: number
    }[] = [];
    selectedUri: string;

    constructor(protected _procMonRuntimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                private _changeDetectionRef: ChangeDetectorRef,
                private _edgeService: EdgeService,
                protected _optionsService: OptionsService) {
        super(_procMonRuntimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef,
            _optionsService);

        Object.assign(this, {serviceList});

        const single = [];

        Object.assign(this, {single});
    }

    public preRun(): void {
        this.detailMenuOpen = 'out';
    }

    public run() {
        this.initializeRunState(false);

        const me = this;
        this.remoteService = this._edgeService.getMicroServices(this.getEndPoint().address).subscribe(results => {
                const edgeServiceList = [];
                this.setInRunState();

                if (results instanceof Array) {
                    results.forEach(function (item) {

                        me._edgeService.getTaskCount(item.uri).subscribe(data => {

                            const i = {
                                active: false,
                                host: '',
                                port: 0,
                                metaData: {},
                                uri: '',
                                serviceId: '',
                                status: 'UP',
                                runningTaskCount: 0
                            };
                            i['active'] = true;
                            i['host'] = item.host;
                            i['port'] = item.port;
                            i['metaData'] = item.metadata;
                            i['uri'] = item.uri;
                            i['serviceId'] = item.serviceId;
                            i['runningTaskCount'] = data;
                            edgeServiceList.push(i);
                            edgeServiceList.sort(function (a, b) {
                                if (a['port'] < b['port']) {
                                    return -1;
                                } else if (a['port'] > b['port']) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            });

                            Object.assign(me.edgeServiceList, edgeServiceList);

                            me.updateGraph();
                        });
                    });
                }
            }
            ,
            error =>
                this.handleError(error)
            ,
            () =>
                console
                    .debug(
                        'Connecting to the service'
                    ));
    }

    public checkPoxySelection() {
        this._edgeService.getSelectedProxy().subscribe(result => {
            this.selectedUri = result['_body'];
        });
    }

    public seedProxiesWithWork() {

        this._edgeService.seedProxiesWithWork().subscribe(data => {

            console.log('job running');
        });

    }

    public runProxyJob(uri: string) {

        this._edgeService.runJob(uri).subscribe(data => {

            console.log('running job on proxy: ' + uri);
        });

    }

    public stop() {
        this.setStopState(true);

        if (this.remoteService) {
            this.remoteService.unsubscribe();
        }
        this.edgeServiceList.length = 0;
        this.actionInitiated = false;

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

    updateGraph() {

        const single = [];
        this.edgeServiceList.forEach(item => {
            single.push({
                'name': item.port + ' ' + item.host,
                'value': item.runningTaskCount
            });
        });

        single.sort(function (a, b) {
            if (a['name'] < b['name']) {
                return -1;
            } else if (a['name'] > b['name']) {
                return 1;
            } else {
                return 0;
            }
        });

        Object.assign(this, {single});

    }

    public ngOnDestroy() {

        this.stop();

    }

    toggleAcordion(): void {

        this.detailMenuOpen = this.detailMenuOpen === 'out' ? 'in' : 'out';

    }
}
