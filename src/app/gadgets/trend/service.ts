import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
@Injectable()
export class TrendService {

    constructor(private _http: Http) {
    }

    get() {
        return this._http.request('/assets/api/trend-model.json')
            .map(res => res.json())
            .catch(RuntimeService.handleError);
    }
}
