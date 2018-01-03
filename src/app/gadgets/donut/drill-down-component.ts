/**
 * Created by jayhamilton on 1/24/17.
 */
import {
    ViewChild, ElementRef, AfterViewInit, Component
} from '@angular/core';

import {
    style, state, trigger, animate, transition
} from '@angular/animations';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import {Facet, Tag} from '../../facet/facet-model';
import {DonutService} from './service';


declare var jQuery: any;

/**
 * Message Modal - clasable modal with message
 *
 * Selector message-modal
 *
 * Methods
 *      popMessageModal - display a message modal for a sepcified duration
 *      showMessageModal - show the message modal
 *      hideMessageModal - hide the message modal
 */
@Component({
    selector: 'app-drill-down-modal',
    moduleId: module.id,
    templateUrl: './drill-down-v2.html',
    animations: [

        trigger('contentSwitch', [
            state('inactive', style({
                opacity: 0
            })),
            state('active', style({
                opacity: 1
            })),
            transition('inactive => active', animate('750ms ease-in')),
            transition('active => inactive', animate('750ms ease-out'))
        ]),
        trigger('tabSwitch', [
            state('inactive', style({
                opacity: .75
            })),
            state('active', style({
                opacity: 1
            })),
            transition('inactive => active', animate('750ms ease-in')),
            transition('active => inactive', animate('750ms ease-out'))
        ])
    ]


})
export class DrillDownComponent implements AfterViewInit {

    modalicon: string;
    modalheader: string;
    modalconfig: string;

    objects: any[];

    objectList: any[] = [];
    objecNameList: string[] = [];
    placeHolderText = 'Begin typing vm name';

    layoutColumnOneWidth = 'six';
    layoutColumnTwoWidth = 'ten';
    facetTags: Array<Facet> = [];
    listHeader = 'Virtual Machines';

    dropZone1Count = 0;
    dropZone2Count = 0;
    dropZone3Count = 0;

    pass = false;


    @ViewChild('drillmodal_tag') modalaRef: ElementRef;
    configModal: any;

    constructor(private _donutService: DonutService) {

    }

    showMessageModal(icon: string, header: string, message: string) {
        this.modalicon = icon;
        this.modalheader = header;
        this.modalconfig = message;
        this.configModal.modal('show');

    }


    hideMessageModal() {
        this.modalicon = '';
        this.modalheader = '';
        this.modalconfig = '';
        this.configModal.modal('hide');
    }


    ngAfterViewInit() {
        this.configModal = jQuery(this.modalaRef.nativeElement);
        this.configModal.modal('hide');
    }

    showDrillDownDetail($event) {
        let chartSelection = null;
        let chartSelectionVal = null;

        if (typeof $event === 'string') {

            chartSelection = $event.toLocaleLowerCase();

        } else {

            chartSelection = $event['name'].toString().toLocaleLowerCase();
            chartSelectionVal = $event['value'];
        }
        const me = this;

        switch (chartSelection) {


            // get objects protected
            case 'passed': {

                this._donutService.getPassObjects().subscribe(data => {

                    console.log(data);
                    me.pass = true;
                    this.objects = data['children'];

                    if (this.objects) {
                        // prepare the typeahead component
                        this.objects.forEach(object => {
                            this.objecNameList.push(object.name);
                        });
                    }
                    me.setFacets();
                });
            }
                break;
            // get VMs that are part of SLAs
            case'staged': {

                this._donutService.getWarnObjects().subscribe(data => {
                    me.pass = false;
                    console.log(data);
                    me.setFacets();

                });
            }
                break;
            // get objects unprotected
            case 'todo': {
                this._donutService.getTodoObjects().subscribe(data => {

                    console.log(data);
                    me.pass = false;
                    this.objects = data['vms'];

                    if (this.objects) {
                        // prepare the typeahead component
                        this.objects.forEach(object => {
                            this.objecNameList.push(object.name);
                        });
                    }

                    me.setFacets();

                });
            }
                break;
        }


        this.showMessageModal(null, 'Detail', null);


        // todo - why is this here???
        this.objects = null;

    }

    showDetail($event) {

        const data: string = JSON.stringify($event, null, 4);
        this.showMessageModal(null, 'Detail', data);


    }

    updateDropZone1(object: any) {
        console.log(object);
        if (object.dragData === 'all') {
            this.dropZone1Count += this.objects.length;
        } else {
            this.dropZone1Count++;
        }
    }

    updateDropZone2(object: any) {
        console.log(object);
        if (object.dragData === 'all') {
            this.dropZone2Count += this.objects.length;
        } else {
            this.dropZone2Count++;
        }
    }

    updateDropZone3(object: any) {
        console.log(object);
        if (object.dragData === 'all') {
            this.dropZone3Count += this.objects.length;
        } else {
            this.dropZone3Count++;
        }
    }

    /**
     * TODO - Facet Tags will have to be worked on. There will need to be a transformation component
     * that transforms the incoming objects into a form expected by the datalist component. The code below
     * is used as a placeholder to just present the facet component
     */
    setFacets() {

        this.facetTags.length = 0;

        const t1 = new Tag('Vm-Tag1');
        const t2 = new Tag('Vm-Tag2');
        const a1 = new Array<Tag>();
        a1.push(t1);
        a1.push(t2);
        const f1 = new Facet('Category A', a1);

        const t3 = new Tag('Vm-Tag3');
        const t4 = new Tag('Vm-Tag4');

        const a2 = new Array<Tag>();
        a2.push(t3);
        a2.push(t4);
        const f2 = new Facet('Category B', a2);

        this.facetTags.push(f1);
        this.facetTags.push(f2);

    }

}
