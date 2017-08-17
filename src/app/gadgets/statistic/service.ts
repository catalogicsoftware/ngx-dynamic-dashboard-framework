/**
 * Created by jayhamilton on 6/24/17.
 */
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
@Injectable()
export class StatisticService {

    constructor(private _http: Http) {
    }

    get(resourceType) {
        return this._http.request('/assets/api/stat-' + resourceType + '-model.json')
            .map(res => res.json())
            .catch(RuntimeService.handleError);
    }
}
