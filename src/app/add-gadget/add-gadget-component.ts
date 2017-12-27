/**
 * Created by jayhamilton on 1/24/17.
 */
import {
    ViewChild, ElementRef, AfterViewInit, Component, Output, EventEmitter
} from '@angular/core';

import {
    style, trigger, animate, transition
} from '@angular/animations';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import {AddGadgetService} from './service';
import {Facet} from '../facet/facet-model';
import {FacetTagProcessor} from '../facet/facet-tag-processor';

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
    selector: 'app-add-gadget-modal',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./styles.css'],
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
export class AddGadgetComponent implements AfterViewInit {

    @Output() addGadgetEvent: EventEmitter<any> = new EventEmitter();

    gadgetObjectList: any[] = [];
    gadgetObjectTitleList: string[] = [];
    placeHolderText = 'Begin typing gadget name';
    layoutColumnOneWidth = 'six';
    layoutColumnTwoWidth = 'ten';
    listHeader= 'Gadgets';
    facetTags: Array<Facet>;

    color = 'white';

    modalicon: string;
    modalheader: string;
    modalmessage: string;

    @ViewChild('messagemodal_tag') messagemodalRef: ElementRef;

    messageModal: any;

    constructor(private _addGadgetService: AddGadgetService) {

        this.getObjectList();
    }

    actionHandler(actionItem, actionName) {
        this.addGadgetEvent.emit(actionItem);
        this.hideMessageModal();

    }


    popMessageModal(icon: string, header: string, message: string, durationms: number) {
        this.showMessageModal(icon, header, message);
        Observable.interval(durationms).take(1).subscribe(
            () => {
                this.hideMessageModal();
            }
        );
    }

    showMessageModal(icon: string, header: string, message: string) {
        this.modalicon = icon;
        this.modalheader = header;
        this.modalmessage = message;
        this.messageModal.modal('show');

    }

    showComponentLibraryModal(header: string) {

        this.modalheader = header;
        this.messageModal.modal('show');
    }

    hideMessageModal() {
        this.modalicon = '';
        this.modalheader = '';
        this.modalmessage = '';
        this.messageModal.modal('hide');
    }

    ngAfterViewInit() {
        this.messageModal = jQuery(this.messagemodalRef.nativeElement);
    }

    getObjectList() {

        this._addGadgetService.getGadgetLibrary().subscribe(data => {
            this.gadgetObjectList.length = 0;
            const me = this;
            data.library.forEach(function (item) {
                me.gadgetObjectList.push(item);
                me.gadgetObjectTitleList.push(item.name);
            });
            const facetTagProcess = new FacetTagProcessor(this.gadgetObjectList);
            this.facetTags = facetTagProcess.getFacetTags();
        });

    }
}
