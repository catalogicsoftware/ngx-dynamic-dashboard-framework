import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {GadgetInstanceService} from '../../grid/grid.service';
import {GadgetBase} from '../_common/gadget-base';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {ConnectionService} from './service';


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
                    animate(5, style({opacity: 0}))
                ])
            ])
    ]

})
export class ResponseTimeGadgetComponent extends GadgetBase implements OnDestroy {

    host: string;
    port: string;
    connectionResults: string;
    connectStatus: string;
    errorEventRaised = false;
    model: any; // todo create an interface for this

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
        this.initializeRunState(true);

        this.errorEventRaised = false;
        this.testConnection();

    }

    public stop() {
        this.setStopState(false);
    }

    public testConnection() {

        this.connectionResults = '';
        const me = this;
        this._procMonRuntimeService.testConnectivity(this.host, this.port).subscribe(
            data => {

                this.connectionResults = data['data'];

                if (this.connectionResults.toLocaleLowerCase().indexOf('success') >= 0) {
                    this.connectStatus = 'success';
                } else if (this.connectionResults.toLocaleLowerCase().indexOf('time') >= 0) {
                    this.connectStatus = 'time-out';
                } else if (this.connectionResults.toLocaleLowerCase().indexOf('refuse') >= 0) {
                    this.connectStatus = 'connection-refuse';
                } else if (this.connectionResults.toLocaleLowerCase().indexOf('unknown') >= 0) {
                    this.connectStatus = 'unknown-host';
                } else if (this.connectionResults.toLocaleLowerCase().indexOf('route') >= 0) {
                    this.connectStatus = 'no-route';
                }

                if (this.connectStatus !== 'success') {
                    this.errorEventRaised = true;
                }

                this.setConnectionStatusModel();

                me.stop();

            },
            error => this.handleError(error));
    }

    private setConnectionStatusModel() {

        const me = this;
        me.model = {};

        // get the model based on the connection status
        this._connectionService.get().subscribe(data => {

            data.forEach(connectionModel => {
                if (connectionModel['event'] === me.connectStatus) {
                    me.model = connectionModel;
                }
            });

        });
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

    ngOnDestroy() {

    }
}
