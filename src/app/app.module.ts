import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ConfigurationService} from './services/configuration.service';
import {RuntimeService} from './services/runtime.service';
import {EndPointService} from './components/board/board-configuration/tab-endpoint/endpoint.service';
import {GadgetPropertyService} from './components/gadgets/_common/gadget-property.service';
import {TrendService} from './components/gadgets/trend/service';
import {DiskService} from './components/gadgets/disk/service';
import {StatisticService} from './components/gadgets/statistic/service';
import {FacetComponent} from './components/gadgets/_library/search-filter/facet-component';
import {CapitalizeFirstPipe} from './components/gadgets/_library/search-filter/capitalize-first-character-pipe';
import {GadgetOperationComponent} from './components/gadgets/_common/gadget-operation-control-component';
import {TrendLineGadgetComponent} from './components/gadgets/trend-line/trend-line-gadget.component';
import {HelpModalComponent} from './components/gadgets/_common/help-modal-component';
import {VisDrillDownComponent} from './components/gadgets/_common/vis-drill-down-component';
import {FilterTagComponent} from './components/gadgets/_library/search-filter/filter-tag-component';
import {FilterListComponent} from './components/gadgets/_library/search-filter/filter-list-component';
import {SearchComponent} from './components/gadgets/_library/search-filter/search-component';
import {JobAnalysisGadgetComponent} from './components/gadgets/job-analysis/job-analysis-gadget.component';
import {NewsGadgetComponent} from './components/gadgets/news/news-gadget.component';
import {ErrorHandlerComponent} from './components/error/error-handler.component';
import {GadgetHeaderComponent} from './components/gadgets/_common/gadget-header-component';
import {BoardConfigurationComponent} from './components/board/board-manager/board-configuration-component';
import {DynamicFormPropertyComponent} from './components/property-manager/dynamic-form-property.component';
import {StatisticGadgetComponent} from './components/gadgets/statistic/statistic-gadget.component';
import {DynamicFormComponent} from './components/property-manager/dynamic-form.component';
import {TrendGadgetComponent} from './components/gadgets/trend/trend-gadget.component';
import {DiskGadgetComponent} from './components/gadgets/disk/disk-gadget.component';
import {PropertyListGadgetComponent} from './components/gadgets/property-list/property-list-gadget.component';
import {ServiceListGadgetComponent} from './components/gadgets/service-list/service-list-gadget.component';
import {CPUGadgetComponent} from './components/gadgets/cpu/cpu-gadget.component';
import {CPUMGadgetComponent} from './components/gadgets/cpum/cpum-gadget.component';
import {MemoryGadgetComponent} from './components/gadgets/memory/memory-gadget.component';
import {BoardLayoutManagerComponent} from './components/board/board-manager/board-layout-manager-component';
import {GadgetLibraryComponent} from './components/gadgets/_library/gadget-library-component';
import {EndPointDetailComponent} from './components/board/board-configuration/tab-endpoint/endpointDetail.component';
import {EndPointComponent} from './components/board/board-configuration/tab-endpoint/endpoint.component';
import {BoardComponent} from './components/board/board-manager/board.component';
import {GridModule} from './components/board/grid-manager/grid.module';
import {CommonModule} from '@angular/common';
import {RoutingModule} from './routing.module';
import {DndModule} from 'ng2-dnd';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SearchResultComponent} from './components/gadgets/_library/search-filter/search-result-component';
import {EdgeServiceListGadgetComponent} from './components/gadgets/edge-service-list/edge-service-list-gadget.component';
import {EdgeService} from './components/gadgets/edge-service-list/service';
import {CPUMService} from './components/gadgets/cpum/service';
import {CPUService} from './components/gadgets/cpu/service';
import {
    MdButtonModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdCheckboxModule,
    MdInputModule
} from '@angular/material';
import {NotificationModule} from './components/board/notification/notification/notification.module';
import {DynamicFormModule} from './components/property-manager/dynamic-form-module';


@NgModule({

    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MdButtonModule, MdCardModule, MdToolbarModule, MdIconModule, MdCheckboxModule, MdInputModule,
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
        DynamicFormModule
    ],
    declarations: [
        AppComponent,
        BoardComponent,
        EndPointComponent,
        EndPointDetailComponent,
        GadgetLibraryComponent,
        BoardLayoutManagerComponent,
        MemoryGadgetComponent,
        CPUGadgetComponent,
        ServiceListGadgetComponent,
        PropertyListGadgetComponent,
        DiskGadgetComponent,
        TrendGadgetComponent,
        StatisticGadgetComponent,
        BoardConfigurationComponent,
        GadgetHeaderComponent,
        ErrorHandlerComponent,
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
