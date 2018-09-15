import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
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
    searchText: string;
    navRoutes: Array<string> = [];
    navigationSubscription: any;
    recordFields:any;
    recordObject=[];


    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _endPointService: EndPointService,
                private _detailService: DetailService
    ) {
        this.navigationSubscription = this._router.events.subscribe((e: any) => {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
                this.getData(true);
            }
        });
    }

    ngOnInit() {
        this.chartType = this._route.snapshot.queryParams['chartType'];
        this.chartSeries = this._route.snapshot.queryParams['chartSeries'];
        this.chartMetric = this._route.snapshot.queryParams['chartMetric'];
        this.endPointName = this._route.snapshot.queryParams['endPointName'];
        this.getData(false);

    }

    getRecord(record: any) {
       console.log(record);
       this.recordObject=[];
       this.recordFields = [];

       this.recordFields = Object.keys(record);

       this.recordFields.forEach(key=>{

           this.recordObject.push({"key": key, "value":record[key]});
       })
    }

    getDetail(detail: any) {


        let href = "";
        detail.links.forEach(link => {
            if (link.rel == 'self') {
                href = link.href;
            }
        });

        let navArray = href.split('/');

        //trying to get data for the current record so do nothing. Avoid this altogether by removing the link from the table.
        if (navArray[navArray.length - 1] == this.navRoutes[this.navRoutes.length - 1]) {
            return;
        }

        this.navRoutes.push(navArray[navArray.length - 1]);

        this._detailService.getDetail(href).subscribe(data => {
            this.data = data.slice();
        });
    }


    getData(isReload: boolean) {
        this._detailService.getDetailByChartSeriesSelected(this.chartType, this.chartSeries, this.chartMetric, this.endPointName).subscribe(data => {
            this.data = data.slice();
        });

        if (!isReload) {
            this.navRoutes.push(this.chartMetric);
        } else {

            /**
             * todo - this won't work for many routes.
             */
            while (this.navRoutes.length > 1) {
                this.navRoutes.splice(this.navRoutes.length - 1, 1);
            }
        }
    }

    goHome() {
        this._router.navigate(["/"]);
    }

    gotToRoute(nav: string, disabled: boolean) {

        if (!disabled) {


            this._router.navigate(['/detail'], {
                queryParams:
                    {
                        chartType: this.chartType,
                        chartSeries: this.chartSeries,
                        chartMetric: this.chartMetric,
                        endPointName: this.endPointName
                    }
            });
        }
    }
}
