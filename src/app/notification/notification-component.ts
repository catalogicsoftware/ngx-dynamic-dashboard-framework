import {AfterViewInit, Component, OnInit} from '@angular/core';


@Component({

    moduleId: module.id,
    selector: 'app-notification-modal',
    templateUrl: './notification-component.html',
    styleUrls: ['./notification-component.css']
})
export class NotificationComponent implements OnInit, AfterViewInit {

    notificationFilters: any [] = [];
    currentNotificationFilter = {
        name: '',
        count: 0
    };

    notificationModal: any;
    modalHeader = 'Notifications';

    constructor() {

        this.notificationFilters.push({name: 'Unacknowledged', count: 4});
        this.notificationFilters.push({name: 'All Notifications', count: 4});
        this.notificationFilters.push({name: 'Trend Gadget', count: 4});
        this.notificationFilters.push({name: 'CPU Gadget', count: 0});
        this.setSelectedNotificationFilter({name: 'Unacknowledged', count: 4});

    }

    ngOnInit() {
    }

    ngAfterViewInit() {

    }

    setSelectedNotificationFilter(item) {

        this.currentNotificationFilter = item;

    }

}
