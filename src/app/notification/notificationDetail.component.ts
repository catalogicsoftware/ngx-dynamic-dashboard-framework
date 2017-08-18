/**
 * Created by jayhamilton on 5/16/17.
 */
import {Component} from '@angular/core';
import {Notification} from './notification.model';

@Component({
    selector: 'app-notification-detail',
    moduleId: module.id,
    templateUrl: './notificationDetail.html'

})
export class NotificationDetailComponent {


    notifications: Notification[];

    constructor() {

        this.notifications = [];
        this.notifications.push(new Notification('CPU Gadget', 'this is a cpu gadget error'));
        this.notifications.push(new Notification('Trend Gadget', 'this is a trend gadget error2'));

    }


}
