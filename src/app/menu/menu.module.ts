import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {DndModule} from 'ng2-dnd';
import {GadgetModule} from '../gadgets/gadget.module';
import {ConfigurationModule} from '../configuration/configuration.module';
import {LayoutModule} from '../layout/layout.module';
import {AddGadgetModule} from '../add-gadget/add-gadget.module';
import {NotificationModule} from '../notification/notification.module';
import {GadgetPropertyService} from '../gadgets/_common/gadget-property.service';
import {ConfigurationService} from '../services/configuration.service';
import {RuntimeService} from '../services/runtime.service';
import {EndPointService} from '../configuration/tab-endpoint/endpoint.service';
import {ObservableWebSocketService} from '../services/websocket-service';
import {TypeAheadInputModule} from '../typeahead-input/typeahead-input.module';
import {MenuComponent} from './menu.component';
import {MenuEventService} from './menu-service';
import {AboutModule} from "../about/about.module";

@NgModule({
    imports: [
        CommonModule,
        NotificationModule,
        AddGadgetModule,
        LayoutModule,
        AboutModule,
        ConfigurationModule,
        TypeAheadInputModule,
        GadgetModule,
        DndModule.forRoot(),
        MatButtonModule, MatIconModule,
    ],
    providers: [EndPointService,
        RuntimeService,
        ConfigurationService,
        GadgetPropertyService,
        ObservableWebSocketService,
        MenuEventService
    ],
    declarations: [
        MenuComponent
    ],
    exports: [
        MenuComponent
    ]
})
export class MenuModule {
}
