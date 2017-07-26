import {CPUGadgetComponent} from '../cpu/cpu-gadget.component';
import {MemoryGadgetComponent} from '../memory/memory-gadget.component';
import {PropertyListGadgetComponent} from '../property-list/property-list-gadget.component';
import {DiskGadgetComponent} from '../disk/disk-gadget.component';
import {ServiceListGadgetComponent} from '../service-list/service-list-gadget.component';
import {StatisticGadgetComponent} from '../statistic/statistic-gadget.component';
import {TrendGadgetComponent} from '../trend/trend-gadget.component';
import {NewsGadgetComponent} from '../news/news-gadget.component';
import {JobAnalysisGadgetComponent} from '../job-analysis/job-analysis-gadget.component';
import {TrendLineGadgetComponent} from '../trend-line/trend-line-gadget.component';
import {EdgeServiceListGadgetComponent} from "../edge-service-list/edge-service-list-gadget.component";
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
            default:
                return null;

        }
    }
}
