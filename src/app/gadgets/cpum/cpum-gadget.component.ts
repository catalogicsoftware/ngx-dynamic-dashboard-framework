import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {GadgetInstanceService} from '../../grid/grid.service';
import {RuntimeService} from '../../services/runtime.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetBase} from '../_common/gadget-base';
import {timer} from 'rxjs';
import {ObservableWebSocketService} from '../../services/websocket-service';
import {ErrorHandler} from '../../error/error-handler';
import {CPUChartMetric} from './cpu.model';
import {Series} from '../_common/base-chart-models/series.model';
import {OptionsService} from "../../configuration/tab-options/service";

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-gadget.css']
})

export class CPUMGadgetComponent extends GadgetBase implements OnDestroy, OnInit {

    // chart options
    gradient = true;
    legend = false;
    xAxis = true;
    yAxis = true;
    showGridLines = true;
    showXAxisLabel = true;
    showYAxisLabel = false;
    xAxisLabel = 'Available CPUs';
    yAxisLabel = 'Percent Utilization';
    view: any[];
    chartData: any[] = [];
    colorScheme: any = {
        domain: ['#0AFF16', '#0d5481']
    };
    webSocket: any;
    waitForConnectionDelay = 2000;

    constructor(protected _runtimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                private _changeDetectionRef: ChangeDetectorRef,
                private _webSocketService: ObservableWebSocketService,
                protected _optionsService: OptionsService) {
        super(_runtimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef,
            _optionsService,
        );
    }

    public preRun(): void {
    }

    public run() {

        this.initializeRunState(false);

        this.webSocket = this._webSocketService.createObservableWebSocket(this.getEndPoint().address).subscribe(data => {

                const dataObject = JSON.parse(data);

                this.updateGraph(dataObject);

            },
            error => {
                /**
                 * todo improve this error handling
                 * @type {{status: string; statusText: string; resource: string}}
                 */
                const errMsg = {
                    status: error.code + '',
                    statusText: ErrorHandler.getWebSocketErrorReason(error),
                    resource: this.getEndPoint().address
                };
                this.handleError(ErrorHandler.getErrorObject(errMsg));
            },
            () => {

                if (this.inRun) {

                    /**
                     * todo improve this error handling
                     * @type {{status: string; statusText: string; resource: string}}
                     */
                    const errMsg = {
                        status: 'disconnected',
                        statusText: 'Service was interrupted while the gadget was running!',
                        resource: this.getEndPoint().address
                    };
                    this.handleError(ErrorHandler.getErrorObject(errMsg));
                }
            }
        );

        /**
         * todo remove dependency on timer
         * @type {Observable<number>}
         */
        const _timer = timer(this.waitForConnectionDelay);

        _timer.subscribe(t => {

            // todo test whether we are connected of not
            this._webSocketService.sendMessage('start');

            this.setInRunState();


        });
    }

    public stop() {
        this.setStopState(true);

        try {

            this._webSocketService.sendMessage('stop');

            this.webSocket.unsubscribe();

            this.updateGraph(null);

        } catch (error) {
            this.handleError(error);
        }

        this.actionInitiated = false;

    }

    public updateGraph(cpus: Array<any>) {

        /** todo
         * i18n
         */
        const chartData: any = [];
        let id = 0;

        if (cpus) {
            cpus.forEach(cpuData => {

                const value = cpuData['utilPct'];

                const series: Array<Series> = [];

                series.push(new Series('used', value));
                series.push(new Series('available', 100 - value));

                /** todo
                 * determine how to get access to the data from the chart for drill down purposes
                 * @type {CPUChartMetric}
                 */
                const cpuChartMetric = new CPUChartMetric(cpuData, 'CPU ' + id++, series);

                chartData.push(cpuChartMetric);

            });
        }

        Object.assign(this, {chartData});

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


        this.title = updatedPropsObject.title;
        this.gradient = updatedPropsObject.gradient;
        this.legend = updatedPropsObject.legend;
        this.xAxis = updatedPropsObject.xAxis;
        this.yAxis = updatedPropsObject.yAxis;
        this.showGridLines = updatedPropsObject.showGridLines;
        this.showXAxisLabel = updatedPropsObject.showXAxisLabel;
        this.showYAxisLabel = updatedPropsObject.showYAxisLabel;

        this.setEndPoint(updatedPropsObject.endpoint);

        this.showOperationControls = true;

    }

    public ngOnDestroy() {

        this.stop();

    }

}
