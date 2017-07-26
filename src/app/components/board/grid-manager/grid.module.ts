import {NgModule, ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {GridComponent} from './grid.component';
import {CellComponent} from './cell.component';
import {GadgetInstanceService} from './grid.service';
import {ConfigurationService} from '../../../services/configuration.service';
import {HttpModule} from '@angular/http';
import {GadgetLibraryService} from '../../gadgets/_library/gadget-library.service';
import {DndModule} from 'ng2-dnd';
import {NewsService} from '../../gadgets/news/service';
import {JobAnalysisService} from '../../gadgets/job-analysis/service';
import {TrendService} from '../../gadgets/trend/service';
import {TrendLineService} from '../../gadgets/trend-line/service';
import {EdgeService} from '../../gadgets/edge-service-list/service';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule, DndModule.forRoot()
    ],
    declarations: [
        GridComponent,
        CellComponent
    ],
    exports: [
        GridComponent
    ],
    providers: [
        GadgetInstanceService,
        ConfigurationService,
        GadgetLibraryService,
        NewsService,
        JobAnalysisService,
        TrendLineService,
        TrendService,
        EdgeService
    ]
})
export class GridModule {
    static withComponents(components: any[]) {
        return {
            ngModule: GridModule,
            providers: [
                {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
            ]
        };
    }
}
