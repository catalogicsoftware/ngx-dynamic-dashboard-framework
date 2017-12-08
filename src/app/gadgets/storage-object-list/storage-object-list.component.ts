import {ChangeDetectorRef, Component} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {GadgetInstanceService} from '../../board/grid/grid.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {GadgetBase} from '../_common/gadget-base';
import {StorageService} from './service';
import {animate, style, transition, trigger} from '@angular/animations';
import {Facet} from '../../facet/facet-model';
import {FacetTagProcessor} from '../../facet/facet-tag-processor';

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./style.css'],
    animations: [
        trigger(
            'showHideAnimation',
            [
                transition(':enter', [   // :enter is alias to 'void => *'
                    style({opacity: 0}),
                    animate(750, style({opacity: 1}))
                ]),
                transition(':leave', [   // :leave is alias to '* => void'
                    animate(750, style({opacity: 0}))
                ])
            ])
    ]
})
export class StorageObjectListComponent extends GadgetBase {

    // runtime document subscription
    news: any;
    resource: string;
    objectList: any[] = [];
    facetTags: Array<Facet>;
    objectTitleList: string[] = [];
    placeHolderText = 'Enter volume search string';
    layoutColumnOneWidth = 'four';
    layoutColumnTwoWidth = 'twelve';


    gadgetHasOperationControls = false;

    constructor(protected _runtimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                protected _changeDetectionRef: ChangeDetectorRef,
                protected _storageService: StorageService) {
        super(_runtimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef);
    }

    public preRun(): void {
        this.updateData(null);

        this.run();
    }

    public run() {
        this.news = [];
        this.initializeRunState( true);
        this.updateData(null);
    }

    public stop() {
        this.setStopState(false);
    }

    public updateData(data: any[]) {

        this._storageService.get().subscribe(item => {
                item.volumes.forEach(_data => {
                    this.objectList.push(_data);
                    this.objectTitleList.push(_data.name);
                });
                const facetTagProcess = new FacetTagProcessor(this.objectList);
                this.facetTags = facetTagProcess.getFacetTags();
            },
            error => this.handleError(error));
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
        this.updateData(null);
    }

    actionHandler(actionItem, actionName) {


    }

}
