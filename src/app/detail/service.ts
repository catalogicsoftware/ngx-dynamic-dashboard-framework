import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RuntimeService} from "../services/runtime.service";
import {environment} from "../../environments/environment";

@Injectable()
export class DetailService {

    constructor(private _http: HttpClient) {
        this.configure();
    }
    testURL = "http://localhost:8080";
    detailURL= "/detail";

    configure() {

        if (!environment.production) {
            this.detailURL = this.testURL + this.detailURL;
        }

    }
    getDetailByChartSeriesSelected(chartType: string, chartSeries: string, endPointName: string) {

        /**
         * Todo - review these parameters and make them more meaningful. The goal is to send to the service
         * a pameterized URL /endpointURL?detailParameter={value or id}
         */
        let p = new HttpParams();
        p = p.append("detailParam", chartSeries);

        return this._http.get<Array<any>>(this.detailURL, {params: p}).catch(RuntimeService.handleError)

    }
}