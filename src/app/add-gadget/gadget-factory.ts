import {CPUGadgetComponent} from '../gadgets/cpu/cpu-gadget.component';
import {MemoryGadgetComponent} from '../gadgets/memory/memory-gadget.component';
import {PropertyListGadgetComponent} from '../gadgets/property-list/property-list-gadget.component';
import {DiskGadgetComponent} from '../gadgets/disk/disk-gadget.component';
import {ServiceListGadgetComponent} from '../gadgets/service-list/service-list-gadget.component';
import {StatisticGadgetComponent} from '../gadgets/statistic/statistic-gadget.component';
import {TrendGadgetComponent} from '../gadgets/trend/trend-gadget.component';
import {NewsGadgetComponent} from '../gadgets/news/news-gadget.component';
import {JobAnalysisGadgetComponent} from '../gadgets/job-analysis/job-analysis-gadget.component';
import {TrendLineGadgetComponent} from '../gadgets/trend-line/trend-line-gadget.component';
import {EdgeServiceListGadgetComponent} from '../gadgets/edge-service-list/edge-service-list-gadget.component';
import {CPUMGadgetComponent} from '../gadgets/cpum/cpum-gadget.component';
import {PortConnectionGadgetComponent} from '../gadgets/port-connection/port-connection-gadget.component';
import {StorageObjectListComponent} from '../gadgets/storage-object-list/storage-object-list.component';
import {DonutGadgetComponent} from '../gadgets/donut/donut-gadget.component';
import {TodoGadgetComponent} from '../gadgets/todo/todo-gadget.component';
import {BubbleGadgetComponent} from "../gadgets/bubble/bubble-gadget.component";
import {BarChartGadgetComponent} from "../gadgets/barchart/barchart-gadget.component";
import {PieChartGadgetComponent} from "../gadgets/piechart/piechart-gadget.component";

/**
 * Created by jayhamilton on 6/30/17.
 */

export class GadgetFactory {


    /**
     * todo - return new instances  instead of the same instance. This requires the creation of new configuration options.
     * @param gadgetType
     * @returns {any}
     */

    static getComponentType(gadgetType): any {

        switch (gadgetType) {

            case 'DonutGadgetComponent':
                return DonutGadgetComponent;
            case 'CPUGadgetComponent':
                return CPUGadgetComponent;
            case 'MemoryGadgetComponent':
                return MemoryGadgetComponent;
            case 'PropertyListGadgetComponent':
                return PropertyListGadgetComponent;
            case 'DiskGadgetComponent':
                return DiskGadgetComponent;
            case 'ServiceListGadgetComponent':
                return ServiceListGadgetComponent;
            case 'StatisticGadgetComponent':
                return StatisticGadgetComponent;
            case 'TrendGadgetComponent':
                return TrendGadgetComponent;
            case 'NewsGadgetComponent':
                return NewsGadgetComponent;
            case'JobAnalysisGadgetComponent':
                return JobAnalysisGadgetComponent;
            case'TrendLineGadgetComponent':
                return TrendLineGadgetComponent;
            case'EdgeServiceListGadgetComponent':
                return EdgeServiceListGadgetComponent;
            case 'CPUMGadgetComponent':
                return CPUMGadgetComponent;
            case 'PortConnectionGadgetComponent':
                return PortConnectionGadgetComponent;
            case 'StorageObjectListComponent':
                return StorageObjectListComponent;
            case 'TodoGadgetComponent': // todo gadget
                return TodoGadgetComponent;
            case 'BubbleGadgetComponent': // todo gadget
                return BubbleGadgetComponent;
            case 'BarChartGadgetComponent': // todo gadget
                return BarChartGadgetComponent;
            case 'PieChartGadgetComponent': // todo gadget
                return PieChartGadgetComponent;
            default:
                return null;// todo add default gadget that would be displayed. Useful for troubleshooting new gadget dev

        }
    }
}
