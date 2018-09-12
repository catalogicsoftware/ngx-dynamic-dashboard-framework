import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EndPointService} from "../configuration/tab-endpoint/endpoint.service";
import {RuntimeService} from "../services/runtime.service";
import {DetailService} from "./service";


/**a
 * Detail component
 *
 */
@Component({
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['styles.css']
})
export class DetailComponent implements OnInit {

    chartType: string;
    chartSeries: string;
    chartMetric: string;
    endPointName: string;
    data = [];
    searchText:string;
    searchText2:string;
    searchText3:string;

    constructor(private _route: ActivatedRoute,
                private _endPointService: EndPointService,
                private _detailService: DetailService
    ) {

    }

    ngOnInit() {
        this.chartType = this._route.snapshot.queryParams['chartType'];
        this.chartSeries = this._route.snapshot.queryParams['chartSeries'];
        this.chartMetric = this._route.snapshot.queryParams['chartMetric'];
        this.endPointName = this._route.snapshot.queryParams['endPointName'];
        this.getData();

    }

    getRecord(record: any){
        //show detail record view
    }

    getDetail(detail: any) {

        let href = "";
        detail.links.forEach(link => {
            if (link.rel == 'self') {
                href = link.href;
            }
        });
        this._detailService.getDetail(href).subscribe(data => {
            this.data = data.slice();
        });
        let pathParts = href.split('/');
        this.chartMetric = '';
        this.chartSeries = this.chartSeries.toLocaleLowerCase() +  ' for ' + pathParts[pathParts.length - 1] ;
    }


    getData() {
        this._detailService.getDetailByChartSeriesSelected(this.chartType, this.chartSeries, this.chartMetric, this.endPointName).subscribe(data => {
            this.data = data.slice();
        });
        this.chartSeries = this.chartSeries.toLocaleLowerCase() +  ' record(s)';
    }
}
