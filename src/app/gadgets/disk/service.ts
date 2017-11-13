/**
 * Created by jayhamilton on 6/24/17.
 */

import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {TrendLineService} from '../trend-line/service';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DiskService {

    constructor(private _http: HttpClient) {
    }

    get() {
        return this._http.get('/assets/api/disk-model.json')
            .catch(RuntimeService.handleError);
    }

    getHelpTopic() {

        return this._http.get('/assets/api/disk-help-model.json')
            .catch(RuntimeService.handleError);
    }

    getMockData() {
        return new Observable(observer => {
            Observable.timer(500, 5000).subscribe(t => {

                const used = TrendLineService.getRandomArbitrary(0, 100);
                const available = 100 - used;

                const data = [
                    {
                        'name': 'used',
                        'value': used
                    },
                    {
                        'name': 'available',
                        'value': available
                    }
                ];
                observer.next(data);
            });
        });
    }
}
