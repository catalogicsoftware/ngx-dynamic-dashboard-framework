import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ConfigurationService} from './services/configuration.service';
import {RuntimeService} from './services/runtime.service';
import {EndPointService} from './configuration/tab-endpoint/endpoint.service';
import {GadgetPropertyService} from './gadgets/_common/gadget-property.service';
import {TrendService} from './gadgets/trend/service';
import {DiskService} from './gadgets/disk/service';
import {StatisticService} from './gadgets/statistic/service';
import {FacetComponent} from './gadgets/_library/search-filter/facet-component';
import {CapitalizeFirstPipe} from './gadgets/_library/search-filter/capitalize-first-character-pipe';
import {GadgetOperationComponent} from './gadgets/_common/gadget-operation-control-component';
import {TrendLineGadgetComponent} from './gadgets/trend-line/trend-line-gadget.component';
import {HelpModalComponent} from './gadgets/_common/help-modal-component';
import {VisDrillDownComponent} from './gadgets/_common/vis-drill-down-component';
import {FilterTagComponent} from './gadgets/_library/search-filter/filter-tag-component';
import {FilterListComponent} from './gadgets/_library/search-filter/filter-list-component';
import {SearchComponent} from './gadgets/_library/search-filter/search-component';
import {JobAnalysisGadgetComponent} from './gadgets/job-analysis/job-analysis-gadget.component';
import {NewsGadgetComponent} from './gadgets/news/news-gadget.component';
import {GadgetHeaderComponent} from './gadgets/_common/gadget-header-component';
import {StatisticGadgetComponent} from './gadgets/statistic/statistic-gadget.component';
import {TrendGadgetComponent} from './gadgets/trend/trend-gadget.component';
import {DiskGadgetComponent} from './gadgets/disk/disk-gadget.component';
import {PropertyListGadgetComponent} from './gadgets/property-list/property-list-gadget.component';
import {ServiceListGadgetComponent} from './gadgets/service-list/service-list-gadget.component';
import {CPUGadgetComponent} from './gadgets/cpu/cpu-gadget.component';
import {CPUMGadgetComponent} from './gadgets/cpum/cpum-gadget.component';
import {MemoryGadgetComponent} from './gadgets/memory/memory-gadget.component';
import {BoardLayoutManagerComponent} from './layout/layout-component';
import {GadgetLibraryComponent} from './gadgets/_library/gadget-library-component';
import {BoardComponent} from './board/board.component';
import {GridModule} from './board/grid/grid.module';
import {CommonModule} from '@angular/common';
import {RoutingModule} from './routing.module';
import {DndModule} from 'ng2-dnd';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SearchResultComponent} from './gadgets/_library/search-filter/search-result-component';
import {EdgeServiceListGadgetComponent} from './gadgets/edge-service-list/edge-service-list-gadget.component';
import {EdgeService} from './gadgets/edge-service-list/service';
import {CPUMService} from './gadgets/cpum/service';
import {CPUService} from './gadgets/cpu/service';
import {
    MdButtonModule,
    MdIconModule,
    MdCheckboxModule,
    MdInputModule
} from '@angular/material';
import {NotificationModule} from './notification/notification.module';
import {DynamicFormModule} from './property-manager/dynamic-form-module';
import {ErrorHandlerModule} from './error/error.module';
import {ConfigurationModule} from './configuration/configuration.module';


@NgModule({

    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MdButtonModule, MdIconModule, MdCheckboxModule, MdInputModule,
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
        NgxChartsModule,
        FormsModule,
        HttpModule,
        DndModule.forRoot(),
        ReactiveFormsModule,
        NotificationModule,
        DynamicFormModule,
        ErrorHandlerModule,
        ConfigurationModule

    ],
    declarations: [
        AppComponent,
        BoardComponent,
        GadgetLibraryComponent,
        BoardLayoutManagerComponent,
        MemoryGadgetComponent,
        CPUGadgetComponent,
        ServiceListGadgetComponent,
        PropertyListGadgetComponent,
        DiskGadgetComponent,
        TrendGadgetComponent,
        StatisticGadgetComponent,
        GadgetHeaderComponent,
        NewsGadgetComponent,
        JobAnalysisGadgetComponent,
        SearchComponent,
        FilterListComponent,
        FilterTagComponent,
        VisDrillDownComponent,
        HelpModalComponent,
        TrendLineGadgetComponent,
        GadgetOperationComponent,
        CapitalizeFirstPipe,
        FacetComponent,
        SearchResultComponent,
        EdgeServiceListGadgetComponent,
        CPUMGadgetComponent
    ],

    providers: [
        EndPointService,
        RuntimeService,
        ConfigurationService,
        GadgetPropertyService,
        TrendService,
        DiskService,
        StatisticService,
        EdgeService,
        CPUMService,
        CPUService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
