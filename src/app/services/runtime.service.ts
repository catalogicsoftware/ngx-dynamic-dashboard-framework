/**
 * Created by jayhamilton on 1/18/17.
 */
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {ErrorHandler} from '../error/error-handler';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


@Injectable()
export class RuntimeService {

    static handleError(err: HttpErrorResponse | any) {

        const errMsg: any = {
            status: '-1',
            statusText: '',
            resource: ''
        };


        if (err.error instanceof Error) {
            errMsg.statusText = err.error.message;
            console.log('Client error');

        } else {
            errMsg.status = err.status;
            errMsg.statusText = 'A backend error occurred';
            errMsg.resource = err.url;
            console.log('Backend error');


        }
        console.log(err);

        return Observable.throw(ErrorHandler.getErrorObject(errMsg));

    }

    constructor(private _http: HttpClient) {
    }

    testURLResponse(url: string) {
        return this._http.get(url, {responseType: 'text'})
            .catch(RuntimeService.handleError);

    }
}

