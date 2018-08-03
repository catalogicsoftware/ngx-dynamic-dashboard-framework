/**
 * Created by jayhamilton on 1/24/17.
 */
import {
    AfterViewInit, Component, Output, EventEmitter, Input
} from '@angular/core';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import {environment} from '../../environments/environment';




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
    selector: 'app-about-modal',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./styles.css']

})
export class AboutComponent implements AfterViewInit {

    modalHeader = 'About';

    messageModal: any;
    env:any;

    constructor() {

        this.env = environment;
    }


    ngAfterViewInit() {

    }



}
