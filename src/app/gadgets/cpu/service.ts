/**
 * Created by jayhamilton on 6/24/17.
 */

import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {HttpClient} from '@angular/common/http';
import {catchError} from "rxjs/operators";

@Injectable()
export class CPUService {

    constructor(private _http: HttpClient) {
    }

    getMockData() {
        return this._http.get('/assets/api/cpu-model.json')
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }
}
