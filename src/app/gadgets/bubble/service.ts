/**
 * Created by jayhamilton on 6/24/17.
 */

import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BubbleService {

    constructor(private _http: HttpClient) {
    }

    getMockData() {
        return this._http.get('/assets/api/bubble-model.json')
            .catch(RuntimeService.handleError);
    }
}
