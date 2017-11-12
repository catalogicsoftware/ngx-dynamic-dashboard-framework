
import {Series} from '../_common/base-chart-models/series.model';
import {Bar} from '../_common/base-chart-models/bar.model';

export class CPUChartMetric extends Bar {

    data: any;

    constructor(data: any, name: string, series: Array<Series>) {
        super(name, series);
        this.data = data;

    }
}

