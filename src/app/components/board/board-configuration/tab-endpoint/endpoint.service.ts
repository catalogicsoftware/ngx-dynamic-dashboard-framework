/**
 * Created by jayhamilton on 2/7/17.
 */
import {Injectable, Output} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class EndPointService {

    localStore = 'http://localhost:8090/api/store';
    private subject: Subject<any> = new Subject<any>();
    demo = true;

    constructor(private _http: Http) {
    }

    getEndPoints() {
        if (this.demo) {
            return this._http.request('/assets/api/endpoint-model.json').map(res => res.json());
        } else {
            return this._http.get(this.localStore + '/endpoint').map(res => res.json());
        }
    }

    deleteEndPoint() {
        return this._http.delete(this.localStore + '/' + 'endpoint');
    }

    saveEndPoint(endpoint: any) {
        const headers = new Headers();

        headers.append('Content-Type', 'application/json');


        if (Object.keys(endpoint).length === 0 && endpoint.constructor === Object) {
            return Observable.empty();
        }

        return this._http.post(this.localStore + '?id=endpoint', JSON.stringify(endpoint), {headers: headers});

    }
}
