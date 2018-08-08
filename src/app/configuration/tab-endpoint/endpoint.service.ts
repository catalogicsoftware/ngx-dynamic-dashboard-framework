/**
 * Created by jayhamilton on 2/7/17.
 */
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {EndPoint} from './endpoint.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class EndPointService {


    constructor(private _http: HttpClient) {
    }

    getEndPoints() {
        if (localStorage.getItem('endpoint') == null) {

            return new Observable(observer => {
                const base = {endPoint: []};
                const testEndPoint = new EndPoint(
                    'TestDataSource',
                    '/assets/api/data-source-model.json',
                    'test user',
                    'testCredential',
                    'unknown',
                    'Predefined data source that cannot be modified or removed.',
                    'token API',
                    'token API Header',
                    'token API Property'
                );
                base.endPoint.push(testEndPoint);
                const memoryEndpoint = new EndPoint(
                    'Memory',
                    '/metric?measure=memory',
                    'test user',
                    'testCredential',
                    'unknown',
                    'Predefined data source that cannot be modified or removed',
                    'token API',
                    'token API Header',
                    'token API Property'
                );
                base.endPoint.push(memoryEndpoint);
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
    }

    saveEndPoint(endpoint: any) {

        return new Observable(observer => {

            localStorage.setItem('endpoint', JSON.stringify(endpoint));
            observer.next({});
            return () => {
            };

        });

    }
}
