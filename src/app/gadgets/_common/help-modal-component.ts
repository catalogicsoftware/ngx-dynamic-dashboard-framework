/**
 * Created by jayhamilton on 1/24/17.
 */
import {
    ViewChild, ElementRef, AfterViewInit, Component, Input
} from '@angular/core';

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
    selector: 'app-help-modal',
    moduleId: module.id,
    templateUrl: './help-modal.html',

})
export class HelpModalComponent implements AfterViewInit {

    @Input() topic: any;

    modalicon: string;
    modalheader: string;
    modalconfig: string;

    @ViewChild('helpmodal_tag') helpmodalaRef: ElementRef;
    configModal: any;


    constructor() {
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
        this.configModal = jQuery(this.helpmodalaRef.nativeElement);
        this.configModal.modal('hide');
    }

    showHelp() {

        this.showMessageModal(null, 'Help', 'Get me out of here!');

    }

}
