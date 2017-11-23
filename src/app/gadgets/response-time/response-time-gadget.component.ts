import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {GadgetInstanceService} from '../../board/grid/grid.service';
import {GadgetBase} from '../_common/gadget-base';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';


@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-gadget.css']
})
export class ResponseTimeGadgetComponent extends GadgetBase implements OnDestroy {
    single: any = [];
    view: any[];
    colorScheme: any = {
        domain: ['#0AFF16', '#0d5481']
    };
    testURL ='';

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

    }

    public preRun(): void {

    }

    public run() {

        this.inRun = true;

        let single = [];
        Object.assign(this, {single});

        const val = performance.now();

        this._procMonRuntimeService.testURLResponse(this.testURL).subscribe(

            data => {

            this.inRun = false;
            const val2 = performance.now();
            single = this.single = [{
                'name': 'Response Time (milliseconds)',
                'value': (val2 - val)
            }];

            Object.assign(this, single);
        },
            error => {
                this.handleError(error);
                console.log('Something went wrong!');
                this.inRun = false;
            });
    }

    public stop() {
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
        this.setEndPoint(updatedPropsObject.endpoint);
        this.showOperationControls = true;
    }

    ngOnDestroy() {

    }
}
