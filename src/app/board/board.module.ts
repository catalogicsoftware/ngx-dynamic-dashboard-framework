import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridModule} from '../grid/grid.module';
import {BoardComponent} from './board.component';
import {CPUMGadgetComponent} from '../gadgets/cpum/cpum-gadget.component';
import {EdgeServiceListGadgetComponent} from '../gadgets/edge-service-list/edge-service-list-gadget.component';
import {TrendLineGadgetComponent} from '../gadgets/trend-line/trend-line-gadget.component';
import {JobAnalysisGadgetComponent} from '../gadgets/job-analysis/job-analysis-gadget.component';
import {NewsGadgetComponent} from '../gadgets/news/news-gadget.component';
import {TrendGadgetComponent} from '../gadgets/trend/trend-gadget.component';
import {StatisticGadgetComponent} from '../gadgets/statistic/statistic-gadget.component';
import {DiskGadgetComponent} from '../gadgets/disk/disk-gadget.component';
import {PropertyListGadgetComponent} from '../gadgets/property-list/property-list-gadget.component';
import {ServiceListGadgetComponent} from '../gadgets/service-list/service-list-gadget.component';
import {CPUGadgetComponent} from '../gadgets/cpu/cpu-gadget.component';
import {MemoryGadgetComponent} from '../gadgets/memory/memory-gadget.component';
import {PortConnectionGadgetComponent} from '../gadgets/port-connection/port-connection-gadget.component';
import {StorageObjectListComponent} from '../gadgets/storage-object-list/storage-object-list.component';
import {DonutGadgetComponent} from '../gadgets/donut/donut-gadget.component';
import {TodoGadgetComponent} from '../gadgets/todo/todo-gadget.component';  // todo gadget
import {BubbleGadgetComponent} from "../gadgets/bubble/bubble-gadget.component";
import {BarChartGadgetComponent} from "../gadgets/barchart/barchart-gadget.component";
import {PieChartGadgetComponent} from "../gadgets/piechart/piechart-gadget.component";

@NgModule({
    imports: [
        CommonModule,
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
            CPUMGadgetComponent,
            PortConnectionGadgetComponent,
            StorageObjectListComponent,
            DonutGadgetComponent,
            TodoGadgetComponent  // todo gadget
            , BubbleGadgetComponent,
            BarChartGadgetComponent,
            PieChartGadgetComponent

        ]),
    ],
    providers: [],
    declarations: [
        BoardComponent
    ]
})
export class BoardModule {
}
