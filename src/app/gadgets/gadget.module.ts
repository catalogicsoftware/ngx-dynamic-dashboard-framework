import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CPUGadgetComponent} from './cpu/cpu-gadget.component';
import {CPUMGadgetComponent} from './cpum/cpum-gadget.component';
import {DiskGadgetComponent} from './disk/disk-gadget.component';
import {MemoryGadgetComponent} from './memory/memory-gadget.component';
import {EdgeServiceListGadgetComponent} from './edge-service-list/edge-service-list-gadget.component';
import {StatisticGadgetComponent} from './statistic/statistic-gadget.component';
import {TrendGadgetComponent} from './trend/trend-gadget.component';
import {TrendLineGadgetComponent} from './trend-line/trend-line-gadget.component';
import {NewsGadgetComponent} from './news/news-gadget.component';
import {JobAnalysisGadgetComponent} from './job-analysis/job-analysis-gadget.component';
import {CPUService} from './cpu/service';
import {EdgeService} from './edge-service-list/service';
import {StatisticService} from './statistic/service';
import {DiskService} from './disk/service';
import {TrendService} from './trend/service';
import {PropertyListGadgetComponent} from './property-list/property-list-gadget.component';
import {DynamicFormModule} from '../dynamic-form/dynamic-form-module';
import {ServiceListGadgetComponent} from './service-list/service-list-gadget.component';
import {DndModule} from 'ng2-dnd';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {GadgetSharedModule} from './_common/gadget-shared.module';
import {ErrorHandlerModule} from '../error/error.module';

import {ResponseTimeGadgetComponent} from './response-time/response-time-gadget.component';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatProgressBarModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {StorageObjectListComponent} from './storage-object-list/storage-object-list.component';
import {StorageService} from './storage-object-list/service';
import {DataListModule} from '../datalist/data-list.module';
import {DonutGadgetComponent} from './donut/donut-gadget.component';
import {DonutService} from './donut/service';
import {APITokenService} from '../api-token/api-token.service';
import {DrillDownComponent} from './donut/drill-down-component';



@NgModule({
    imports: [
        CommonModule,
        GadgetSharedModule,
        DndModule.forRoot(),
        DynamicFormModule,
        ErrorHandlerModule,
        NgxChartsModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressBarModule,
        FormsModule,
        DataListModule
    ],
    declarations: [
        CPUGadgetComponent,
        CPUMGadgetComponent,
        DiskGadgetComponent,
        MemoryGadgetComponent,
        EdgeServiceListGadgetComponent,
        StatisticGadgetComponent,
        TrendGadgetComponent,
        TrendLineGadgetComponent,
        NewsGadgetComponent,
        JobAnalysisGadgetComponent,
        StatisticGadgetComponent,
        PropertyListGadgetComponent,
        ServiceListGadgetComponent,
        ResponseTimeGadgetComponent,
        StorageObjectListComponent,
        DonutGadgetComponent,
        DrillDownComponent
    ],

    providers: [TrendService,
        DiskService,
        StatisticService,
        EdgeService,
        CPUService,
        StorageService,
        DonutService,
        APITokenService
    ],

    exports: [
        CPUGadgetComponent,
        CPUMGadgetComponent,
        DiskGadgetComponent,
        MemoryGadgetComponent,
        EdgeServiceListGadgetComponent,
        StatisticGadgetComponent,
        TrendGadgetComponent,
        TrendLineGadgetComponent,
        NewsGadgetComponent,
        JobAnalysisGadgetComponent,
        StatisticGadgetComponent,
        PropertyListGadgetComponent,
        ServiceListGadgetComponent,
        ResponseTimeGadgetComponent,
        StorageObjectListComponent,
        DonutGadgetComponent
    ]
})
export class GadgetModule {
}

