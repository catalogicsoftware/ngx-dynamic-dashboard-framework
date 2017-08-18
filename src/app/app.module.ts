import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ConfigurationService} from './services/configuration.service';
import {RuntimeService} from './services/runtime.service';
import {EndPointService} from './configuration/tab-endpoint/endpoint.service';
import {GadgetPropertyService} from './gadgets/_common/gadget-property.service';
import {TrendLineGadgetComponent} from './gadgets/trend-line/trend-line-gadget.component';
import {JobAnalysisGadgetComponent} from './gadgets/job-analysis/job-analysis-gadget.component';
import {NewsGadgetComponent} from './gadgets/news/news-gadget.component';
import {StatisticGadgetComponent} from './gadgets/statistic/statistic-gadget.component';
import {TrendGadgetComponent} from './gadgets/trend/trend-gadget.component';
import {DiskGadgetComponent} from './gadgets/disk/disk-gadget.component';
import {PropertyListGadgetComponent} from './gadgets/property-list/property-list-gadget.component';
import {ServiceListGadgetComponent} from './gadgets/service-list/service-list-gadget.component';
import {CPUGadgetComponent} from './gadgets/cpu/cpu-gadget.component';
import {CPUMGadgetComponent} from './gadgets/cpum/cpum-gadget.component';
import {MemoryGadgetComponent} from './gadgets/memory/memory-gadget.component';
import {BoardComponent} from './board/board.component';
import {GridModule} from './board/grid/grid.module';
import {CommonModule} from '@angular/common';
import {RoutingModule} from './routing.module';
import {DndModule} from 'ng2-dnd';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EdgeServiceListGadgetComponent} from './gadgets/edge-service-list/edge-service-list-gadget.component';

import {
    MdButtonModule,
    MdIconModule
} from '@angular/material';
import {NotificationModule} from './notification/notification.module';
import {DynamicFormModule} from './property-manager/dynamic-form-module';
import {ConfigurationModule} from './configuration/configuration.module';
import {LayoutModule} from './layout/layout.module';
import {AddGadgetModule} from './add-gadget/add-gadget.module';
import {GadgetModule} from './gadgets/gadget.module';


@NgModule({

    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MdButtonModule, MdIconModule,
        GridModule.withComponents([
            MemoryGadgetComponent,
            CPUGadgetComponent,
            ServiceListGadgetComponent,
            PropertyListGadgetComponent,
            DiskGadgetComponent,
            StatisticGadgetComponent,
            TrendGadgetComponent,
            NewsGadgetComponent,
            JobAnalysisGadgetComponent,
            TrendLineGadgetComponent,
            EdgeServiceListGadgetComponent,
            CPUMGadgetComponent
        ]),
        RoutingModule,
        FormsModule,
        HttpModule,
        DndModule.forRoot(),
        ReactiveFormsModule,
        NotificationModule,
        DynamicFormModule,
        ConfigurationModule,
        LayoutModule,
        AddGadgetModule,
        GadgetModule
    ],
    declarations: [
        AppComponent,
        BoardComponent,
    ],

    providers: [
        EndPointService,
        RuntimeService,
        ConfigurationService,
        GadgetPropertyService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
