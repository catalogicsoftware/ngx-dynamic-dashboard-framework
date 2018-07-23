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
import {TodoGadgetComponent} from './todo/todo-gadget.component';  // todo gadget
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
import {
    MatButtonModule, MatCheckboxModule, MatExpansionModule, MatIconModule, MatInputModule, MatOptionModule,
    MatProgressBarModule, MatSelectModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {StorageObjectListComponent} from './storage-object-list/storage-object-list.component';
import {StorageService} from './storage-object-list/service';
import {DataListModule} from '../datalist/data-list.module';
import {DonutGadgetComponent} from './donut/donut-gadget.component';
import {DonutService} from './donut/service';
import {APITokenService} from '../api-token/api-token.service';
import {DrillDownComponent} from './donut/drill-down-component';
import {FacetModule} from '../facet/facet.module';
import {TypeAheadInputModule} from '../typeahead-input/typeahead-input.module';
import {TodoService} from './todo/service';
import {ConnectionService} from './response-time/service';
import {BubbleGadgetComponent} from "./bubble/bubble-gadget.component";
import {ResultViewComponent} from "./response-time/result-view.component";  // todo gadget



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
        MatExpansionModule,
        MatOptionModule,
        MatSelectModule,
        FormsModule,
        FacetModule,
        TypeAheadInputModule,
        DataListModule
    ],
    declarations: [
        TodoGadgetComponent,  // todo gadget
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
        DrillDownComponent,
        BubbleGadgetComponent,
        ResultViewComponent

    ],

    providers: [TrendService,
        DiskService,
        StatisticService,
        EdgeService,
        CPUService,
        StorageService,
        DonutService,
        APITokenService,
        ConnectionService,
        TodoService  // todo gadget
    ],

    exports: [
        TodoGadgetComponent,  // todo gadget
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
        BubbleGadgetComponent
    ]
})
export class GadgetModule {
}

