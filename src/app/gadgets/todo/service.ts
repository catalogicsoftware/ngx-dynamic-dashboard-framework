/**
 * Created by jayhamilton on 6/24/17. Todo Service
 */
import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {HttpClient} from '@angular/common/http';
import {catchError} from "rxjs/operators";
@Injectable()
export class TodoService {

    constructor(private _http: HttpClient) {
    }

    get() {
        return this._http.get('/assets/api/todo-model.json')
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }
}
