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
        let notification = new Notification('CPU Gadget', 'this is a cpu gadget error');
        notification.setWhen((new Date()).toString());
        this.notifications.push(notification);
        notification = new Notification ('Trend Gadget', 'this is a trend gadget error2');
        notification.setWhen((new Date()).toString());
        this.notifications.push(notification);
        notification = new Notification ('Disk Gadget', 'Disk 1 alert');
        notification.setWhen((new Date()).toString());
        this.notifications.push(notification);
        notification = new Notification ('Disk Gadget', 'Disk 2 alert');
        notification.setWhen((new Date()).toString());
        this.notifications.push(notification);

    }


}
