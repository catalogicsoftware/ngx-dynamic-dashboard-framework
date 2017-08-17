/**
 * Created by jayhamilton on 6/24/17.
 */
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {TrendLineService} from '../trend-line/service';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class DiskService {

    constructor(private _http: Http) {
    }

    get() {
        return this._http.request('/assets/api/disk-model.json')
            .map(res => res.json())
            .catch(RuntimeService.handleError);
    }

    getHelpTopic() {

        return this._http.request('/assets/api/disk-help-model.json')
            .map(res => res.json())
            .catch(RuntimeService.handleError);
    }

    getMockData() {
        return new Observable(observer => {
            Observable.timer(500, 15000).subscribe(t => {

                const data = [{
                        'name': 'used',
                        'value': TrendLineService.getRandomArbitrary(45, 52)
                }];
                observer.next(data);
            });
        });
    }
}
