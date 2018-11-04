/**
 * Created by jayhamilton on 1/24/17.
 */
import {
    Component, Output, EventEmitter, Input
} from '@angular/core';

import {ConfigurationService} from '../../services/configuration.service';
import {environment} from '../../../environments/environment'

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
    selector: 'app-boards-config-tab',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./styles.css']

})
export class BoardsConfigurationTabComponent {

    @Output() dashboardCreateEvent: EventEmitter<any> = new EventEmitter();
    @Output() dashboardEditEvent: EventEmitter<any> = new EventEmitter();
    @Output() dashboardDeleteEvent: EventEmitter<any> = new EventEmitter();
    @Input() dashboardList: any [];


    newDashboardItem = '';
    env: any;

    constructor(private _configurationService: ConfigurationService) {

        this.env = environment;

    }


    createBoard(name: string) {
        if (name !== '') {
            this.dashboardCreateEvent.emit(name);
            this.newDashboardItem = '';
        }
    }

    editBoard(name: string) {
        this.dashboardEditEvent.emit(name);
    }

    deleteBoard(name: string) {
        this.dashboardDeleteEvent.emit(name);
    }

}
