/**
 * Created by jayhamilton on 6/24/17.
 */
import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class StatisticService {

    constructor(private _http: HttpClient) {
    }

    get(resourceType) {
        return this._http.get('/assets/api/stat-' + resourceType + '-model.json')
            .catch(RuntimeService.handleError);
    }
}
