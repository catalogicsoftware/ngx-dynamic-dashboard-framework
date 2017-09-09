/**
 * Created by jayhamilton on 1/18/17.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {ErrorHandler} from '../error/error-handler';


@Injectable()
export class RuntimeService {

    static handleError(error: Response | any) {

        const errMsg: any = {
            status: '-1',
            statusText: '',
            resource: ''
        };

        if (error instanceof Response) {
            errMsg.status = error.status;
            errMsg.statusText = error.statusText;
            errMsg.resource = error.url;

        } else {
            errMsg.statusText = error.message ? error.message : error.toString();
        }

        return Observable.throw(ErrorHandler.getErrorObject(errMsg));

    }

    constructor(private _http: Http) {
    }

}

