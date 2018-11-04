/**
 * Created by jayhamilton on 1/24/17.
 */
import {
    AfterViewInit, Component, Output, EventEmitter, Input
} from '@angular/core';

import {boardLayouts} from './model';


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
    templateUrl: './view.html',
    styleUrls: ['./styles.css']

})
export class BoardLayoutManagerComponent implements AfterViewInit {

    @Input() layoutId;
    @Output() boardLayoutChangeEvent: EventEmitter<any> = new EventEmitter();

    boardLayouts: any[];

    modalHeader = 'Layout';

    messageModal: any;

    constructor() {
        this.initializeLayouts();
    }

    selectBoardLayout(layoutId: number) {

        for (let x = 0; x < this.boardLayouts.length; x++) {

            if (this.boardLayouts[x].id === layoutId) {
                this.boardLayoutChangeEvent.emit(this.boardLayouts[x]);
                this.layoutId = layoutId;
                break;
            }
        }
    }

    ngAfterViewInit() {

    }

    initializeLayouts() {

        Object.assign(this, {boardLayouts});

    }

}
