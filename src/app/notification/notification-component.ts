import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

declare var jQuery: any;

@Component({

    moduleId: module.id,
    selector: 'app-notification-modal',
    templateUrl: './notification-component.html',
    styleUrls: ['./notification-component.css']
})
export class NotificationComponent implements OnInit, AfterViewInit {

    @ViewChild('notificationModalTag') notificationModalRef: ElementRef;

    notificationFilters: any [] = [];
    currentNotificationFilter = {
            name: '',
            count: 0
        };

    notificationModal: any;
    modalHeader: string;

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
        this.notificationModal = jQuery(this.notificationModalRef.nativeElement);
    }

    setSelectedNotificationFilter(item) {

        this.currentNotificationFilter = item;

    }

    showNotificationModal(header: string) {

        this.modalHeader = header;
        this.notificationModal.modal('show');
    }

    hideMessageModal() {
        this.modalHeader = '';
        this.notificationModal.modal('hide');
    }

}
