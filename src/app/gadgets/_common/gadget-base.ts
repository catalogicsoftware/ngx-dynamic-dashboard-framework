import {ErrorObject} from '../../error/error-model';
import {EndPoint} from '../../configuration/tab-endpoint/endpoint.model';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetPropertyService} from './gadget-property.service';
import {RuntimeService} from '../../services/runtime.service';
import {GadgetInstanceService} from '../../grid/grid.service';
import {AfterViewInit, ChangeDetectorRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DynamicFormComponent} from '../../dynamic-form/dynamic-form.component';
import {OptionsService} from "../../configuration/tab-options/service";

/**
 * Created by jayhamilton on 6/22/17.
 */

export abstract class GadgetBase implements IGadget, OnDestroy, OnInit, AfterViewInit {
    @ViewChild(DynamicFormComponent) propertyPageForm: DynamicFormComponent;
    title: string;
    instanceId: number;
    config: any;
    gadgetTags: Array<any>;

    /**
     * Used to determine when to show the controls that appear in the gadgets
     * heading area. This is set by the mouseover/mouseout events.
     * @type {boolean}
     */
    showControls = false;

    /**
     * determines whether to show the gadgets property page
     * @type {boolean}
     */
    inConfig = false;

    /**
     * Determines if a gadget is runnning or not
     * @type {boolean}
     */
    inRun = false;

    /**
     * When a gadget is manually put into run mode this property will be used to
     * display a spinning icon and will be enabled between intiating an operation (run or stop)
     * to the operation is enabled
     * @type {boolean}
     */
    actionInitiated = false;

    /**
     * Gadgets that are of type realtime have a run/stop set of controls.
     * Those gadgets should set this property to true. This property's visibility
     * will also be controlled by whether the gadget's configuration form is valid.
     * @type {boolean}
     */
    showOperationControls = false;
    /**
     * This property is used to simply allow the gadget to not show any run/stop controls.
     * This is needed because the showOperationControls does something similar but not exactly the same.
     * The showOperationControls property allows the gadgetBase to determine if the run control, if the gadget
     * uses it, to be displayed when the gadget has a valid configuration.
     *
     * Default: true - Gadgets without a need for run/stop control should override this value.
     * @type {boolean}
     */
    gadgetHasOperationControls = true;

    /**
     * Most gadgets need configuration so gadgets that don't can override this property
     * @type {boolean}
     */
    showConfigurationControl = true;

    // internally controls dynamic form properties
    propertyPages: any[] = [];

    endpointObject: EndPoint;

    errorObject: ErrorObject;
    errorExists = false;
    globalOptions:any;

    constructor(protected _runtimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                protected changeDetectionRef: ChangeDetectorRef,
                protected _optionsService: OptionsService) {

        this._optionsService.listenForGlobalOptionsChanges().subscribe(options=>{

            /**
             * This is called when there is a change to the options tab within the configuration modal.
             * The following method needs to also be called when the gadget is initially instantiated.
             * When the gadget is instantiated the option values need to come from the persistent store.
             */

            this.updateGadgetWithGlobalOptions(options);
        });

        this.updateGadgetWithGlobalOptions(this._optionsService.getBoardOptions())
    }

    public ngOnInit() {
       this.toggleConfigMode();
       this.changeDetectionRef.detectChanges();
    }

    public ngAfterViewInit() {


        if (this.propertyPageForm) {

            if (this.propertyPageForm.isPropertyPageValid) {
                this.toggleConfigMode();
                this.changeDetectionRef.detectChanges();

                this.showOperationControls = true;
                this.changeDetectionRef.detectChanges();
            } else {
                this.showOperationControls = false;
                this.changeDetectionRef.detectChanges();
            }
        }
        this.preRun();
    }

    public initializeState() {

    }

    public toggleConfigMode() {

        if (!this.inConfig) {

            this.initializeProperties();
        }
        this.inConfig = !this.inConfig;
    }

    public initializeProperties() {

        if (this.propertyPages.length === 0 && this.config.propertyPages) {
            this._propertyService.setPropertyPagesAndProperties(this.config.propertyPages, this.propertyPages);
        }
    }

    public abstract run(): void

    public abstract stop(): void

    public abstract updateProperties(updatedProperties: any): void

    public abstract updateData(data: any[]): void

    public abstract preRun(): void

    public handleError(error: ErrorObject) {


        this.inRun = false;
        this.actionInitiated = false;
        this.errorExists = true;
        this.errorObject = error;

    }

    public initializeRunState(forceRunState: boolean) {

        this.errorExists = false;
        this.actionInitiated = true;
        this.inConfig = false;
        if (forceRunState) {
            this.setInRunState();
        }
    }

    public setInRunState() {

        this.inRun = true;
        this.actionInitiated = false;
    }

    public setStopState(longRunningStopAction: boolean) {
        /**
         *  If the gadget indicates longRunningStopAction then the gadget has to set this value to
         *  false once the operation is complete
         */
        this.actionInitiated = longRunningStopAction;
        this.inRun = false;

    }

    public remove() {
        this._gadgetInstanceService.removeInstance(this.instanceId);
    }

    public showGadgetControls(enable: boolean) {
        this.showControls = enable;
    }

    /**
     * called from cell.component after the gadget is created during runtime
     * intanceId, config, title and endpoint are common to all gadgets. Once the gadgets are configured
     * we give them an opportunity to perform an action during the preRun() method. For example,
     * the statistic gadget uses preRun() to make a single call to the endpoint to update its display.
     * */
    public configureGadget(instanceId: number, config: any, tags: Array<any>) {

        this.instanceId = instanceId;
        this.config = config;
        this.gadgetTags = tags.slice();

        this.setTitle(this.getPropFromPropertyPages('title'));
        this.setEndPoint(this.getPropFromPropertyPages('endpoint'));

        /**
         *  Todo - remove this prerun call and refactor remaining code. Prerun was called twice and had an impact on the barchart api calls.
         *  API calls continued after route changes which is undesirable. See ngAfterViewInit where it is also called from.
         */
        //this.preRun();

    }

    protected setEndPoint(endpoint: string) {

        this._endPointService.getEndPoints().subscribe(data => {

            if (data['endPoint']) {
                data['endPoint'].forEach(item => {
                    if (item.name === endpoint) {
                        this.endpointObject = item;
                    }
                });
            }
        });
    }

    protected getEndPoint() {
        return this.endpointObject;
    }

    protected setTitle(title: string) {
        this.title = title;
    }

    protected getPropFromPropertyPages(prop: string) {

        for (let x = 0; x < this.config.propertyPages.length; x++) {

            for (let i = 0; i < this.config.propertyPages[x].properties.length; i++) {

                if (this.config.propertyPages[x].properties[i].key === prop) {
                    return this.config.propertyPages[x].properties[i].value;
                }
            }

        }
        return 'Unknown';
    }

    public ngOnDestroy() {

    }

    public updateGadgetWithGlobalOptions(options:any){


        this.globalOptions = Object.assign({},options);


    }
}
