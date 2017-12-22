/**
 * Created by jayhamilton on 1/24/17.
 */
import {
    AfterViewInit, Component, Output, EventEmitter
} from '@angular/core';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
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

    @Output() boardLayoutChangeEvent: EventEmitter<any> = new EventEmitter();

    boardLayouts: any[];


    modalHeader = 'Layout';

    currentBoardLayout = 4;

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

        // this.hideMessageModal();
    }


    ngAfterViewInit() {}

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
