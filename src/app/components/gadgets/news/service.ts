/**
 * Created by jayhamilton on 6/24/17.
 */
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {RuntimeService} from '../../../services/runtime.service';
@Injectable()
export class NewsService {

    constructor(private _http: Http) {
    }

    get() {
        return this._http.request('/assets/api/news-model.json')
            .map(res => res.json())
            .catch(RuntimeService.handleError);
    }
}
