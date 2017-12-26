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
import {Facet} from '../../facet/facet-model';
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
    objectTitleList: string[] = [];
    placeHolderText = 'Begin typing vm name';
    layoutColumnOneWidth = 'six';
    layoutColumnTwoWidth = 'ten';
    facetTags: Array<Facet> = [];


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
        const chartSelection = $event['name'].toString().toLocaleLowerCase();
        const chartSelectionVal = $event['value'];

        const me = this;

        switch (chartSelection) {

            // get objects protected
            case 'passed': {

                this._donutService.getPassObjects().subscribe(data => {

                    console.log(data);
                });
            }
                break;
            // get VMs that are part of SLAs
            case'staged': {

                this._donutService.getWarnObjects().subscribe(data => {

                    console.log(data);

                });
            }
                break;
            // get objects unprotected
            case 'todo': {
                this._donutService.getTodoObjects().subscribe(data => {

                    console.log(data);
                });
            }
                break;

        }

        this.showMessageModal(null, 'Detail', null);
        this.objects = null;

    }

    showDetail($event) {

        const data: string = JSON.stringify($event, null, 4);
        this.showMessageModal(null, 'Detail', data);


    }

}
