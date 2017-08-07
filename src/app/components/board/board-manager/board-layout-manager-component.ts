/**
 * Created by jayhamilton on 1/24/17.
 */
import {
    ViewChild, ElementRef, AfterViewInit, Component, Output, EventEmitter, style, animate,
    transition, state, trigger
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import {boardLayouts} from './models/board-layouts.model';

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
    selector: 'app-board-layout-manager-modal',
    moduleId: module.id,
    templateUrl: 'board-layout-manager.html',
    styleUrls: ['styles-board.css']

})
export class BoardLayoutManagerComponent implements AfterViewInit {

    @Output() boardLayoutChangeEvent: EventEmitter<any> = new EventEmitter();

    boardLayouts: any[];

    modalicon: string;
    modalheader: string;
    modalmessage: string;
    currentBoardLayout = 4;

    @ViewChild('messagemodala_tag') messagemodalaRef: ElementRef;
    messageModal: any;

    constructor() {
        this.initializeLayouts();
    }

    selectBoardLayout(layoutId: number) {

        this.currentBoardLayout = layoutId;
        for (let x = 0; x < this.boardLayouts.length; x++) {

            if (this.boardLayouts[x].id === layoutId) {
                this.boardLayoutChangeEvent.emit(this.boardLayouts[x]);
                break;
            }
        }

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

    showBoardLayoutsModal(header: string, selectedStructure: string) {
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
        this.messageModal = jQuery(this.messagemodalaRef.nativeElement);
    }

    initializeLayouts() {


        Object.assign(this, {boardLayouts});

    }

    setChecked(selectedStructure: string) {

        this.boardLayouts.forEach(function (_selectedStructure) {
            if (selectedStructure.toString().includes(_selectedStructure.structure)) {
                _selectedStructure.checked = true;
            } else {
                _selectedStructure.checked = false;
            }
        });
    }
}
