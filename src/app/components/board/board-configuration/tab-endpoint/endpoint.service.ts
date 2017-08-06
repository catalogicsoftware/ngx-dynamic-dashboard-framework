/**
 * Created by jayhamilton on 2/7/17.
 */
import {Injectable, Output} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {EndPoint} from "./endpoint.model";


@Injectable()
export class EndPointService {

    localStore = 'http://localhost:8090/api/store';
    private subject: Subject<any> = new Subject<any>();
    demo = true;

    constructor(private _http: Http) {
    }

    getEndPoints() {

        if (this.demo) {

            if (localStorage.getItem('endpoint') == null) {

                return new Observable(observer => {
                    const base = {endPoint: []};
                    const testEndPoint = new EndPoint(
                        'TestEndPoint',
                        'localhost://test',
                        'test user',
                        'testCredential',
                        'password',
                        'description');
                    base.endPoint.push(testEndPoint);
                    localStorage.setItem('endpoint', JSON.stringify(base));
                    observer.next(base);
                    return () => {
                    };
                });
            } else {

                return new Observable(observer => {
                    const data = JSON.parse(localStorage.getItem('endpoint'));
                    observer.next(data);
                    return () => {
                    };
                });

            }
        } else {

            return this._http.get(this.localStore + '/endpoint').map(res => res.json());
        }
    }

    deleteEndPoint() {
        return this._http.delete(this.localStore + '/' + 'endpoint');
    }

    saveEndPoint(endpoint: any) {

        if (this.demo) {
            return new Observable(observer => {

                localStorage.setItem('endpoint', JSON.stringify(endpoint));
                observer.next({});
                return () => {
                };

            });
        } else {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            if (Object.keys(endpoint).length === 0 && endpoint.constructor === Object) {
                return Observable.empty();
            }
            return this._http.post(this.localStore + '?id=endpoint', JSON.stringify(endpoint), {headers: headers});
        }

    }
}
