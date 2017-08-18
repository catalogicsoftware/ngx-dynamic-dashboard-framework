import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationComponent} from './notification-component';
import {NotificationService} from './notification-service';
import {NotificationDetailComponent} from './notificationDetail.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [NotificationComponent, NotificationDetailComponent],
    providers: [NotificationService],
    exports: [NotificationComponent]
})
export class NotificationModule {
}
