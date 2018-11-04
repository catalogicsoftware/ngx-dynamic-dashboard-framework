import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {HttpClient} from '@angular/common/http';
import {catchError} from "rxjs/operators";
@Injectable()
export class TrendService {

    constructor(private _http: HttpClient) {
    }

    get() {
        return this._http.get('/assets/api/trend-model.json')
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }
}
