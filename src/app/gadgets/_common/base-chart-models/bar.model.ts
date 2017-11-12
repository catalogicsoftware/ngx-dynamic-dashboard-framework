import {Series} from './series.model';

export abstract class Bar {

    public name: string;
    public series: Array<Series>;


    constructor(name: string, series: Array<Series>) {
        this.name = name;
        this.series = series;
    }

}