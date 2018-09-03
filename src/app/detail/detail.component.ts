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
    templateUrl: './view.html'
})
export class DetailComponent implements OnInit {

    chartType: string;
    chartSeries: string;
    endPointName: string;
    data=[];
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
        this.endPointName = this._route.snapshot.queryParams['endPointName'];
        this.getData();

    }


    getData() {
        this._detailService.getDetailByChartSeriesSelected(this.chartType, this.chartSeries, this.endPointName).subscribe(data => {
            this.data = data.slice();
        })
    }
}
