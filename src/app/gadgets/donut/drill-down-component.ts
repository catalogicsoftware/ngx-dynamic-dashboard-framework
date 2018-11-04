/**
 * Created by jayhamilton on 1/24/17.
 */
import {
    ViewChild, ElementRef, AfterViewInit, Component
} from '@angular/core';

import {
    style, state, trigger, animate, transition
} from '@angular/animations';

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
    templateUrl: './drill-down.html',
    styleUrls: ['drill-down-style.css'],
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

    chartSelectedName: string;
    chartSelectedValue: number;

    objects: any[];
    objecNameList: string[];

    placeHolderText = 'Begin typing a name';

    layoutColumnOneWidth = 'six';
    layoutColumnTwoWidth = 'ten';
    facetTags: Array<Facet> = [];
    listHeader = 'Header Name';

    dropZone1Count = 0;
    dropZone2Count = 0;
    dropZone3Count = 0;

    hideRightColumn = false;
    leftColumnWidth = 'eleven';



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

        if (typeof $event === 'string') {

            this.chartSelectedName = $event.toLocaleLowerCase();

        } else {

            this.chartSelectedName = $event['name'].toString().toLocaleLowerCase();
            this.chartSelectedValue = $event['value'];
        }

        if (this.chartSelectedName === 'non-compliant') {

            this.hideRightColumn = false;
            this.leftColumnWidth = 'eleven';

        } else {

            this.hideRightColumn = true;
            this.leftColumnWidth = 'sixteen';
        }

        this._donutService.get().subscribe(_data => {

            _data.forEach(object => {

                if (object['name'] === this.chartSelectedName) {

                    this.processObjects(object['detail']);
                    this.setFacets();
                    this.showMessageModal(null, 'Detail', null);

                }
            });
        });
    }

    showDetail($event) {

        const data: string = JSON.stringify($event, null, 4);
        this.showMessageModal(null, 'Detail', data);


    }

    processObjects(objectsToProcess: any) {


        this.objects = [];
        this.objecNameList = [];

        Object.assign(this.objects, objectsToProcess);

        this.objects.forEach(name => {

            this.objecNameList.push(name['name']);

        });

    }

    updateDropZone1(object: any) {
        if (object.dragData === 'all') {
            this.dropZone1Count += this.objects.length;
        } else {
            this.dropZone1Count++;
        }
    }

    updateDropZone2(object: any) {
        if (object.dragData === 'all') {
            this.dropZone2Count += this.objects.length;
        } else {
            this.dropZone2Count++;
        }
    }

    updateDropZone3(object: any) {
        if (object.dragData === 'all') {
            this.dropZone3Count += this.objects.length;
        } else {
            this.dropZone3Count++;
        }
    }

    setFacets() {

        this.facetTags.length = 0;

        const t1 = new Tag('Tag1');
        const t2 = new Tag('Tag2');
        const a1 = new Array<Tag>();
        a1.push(t1);
        a1.push(t2);
        const f1 = new Facet('Category A', a1);

        const t3 = new Tag('Tag3');
        const t4 = new Tag('Tag4');

        const a2 = new Array<Tag>();
        a2.push(t3);
        a2.push(t4);
        const f2 = new Facet('Category B', a2);

        this.facetTags.push(f1);
        this.facetTags.push(f2);

    }

}
