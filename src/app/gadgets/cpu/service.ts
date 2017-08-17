/**
 * Created by jayhamilton on 6/24/17.
 */
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {TrendLineService} from '../trend-line/service';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class CPUService {

    constructor(private _http: Http) {
    }

    getMockData() {
        return this._http.request('/assets/api/cpu-model.json')
            .map(res => res.json())
            .catch(RuntimeService.handleError);
    }
}
