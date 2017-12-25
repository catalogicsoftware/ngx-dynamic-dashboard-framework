/**
 * Created by jayhamilton on 6/24/17.
 */

import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {TrendLineService} from '../trend-line/service';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class DonutService {

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

    getMockData(valueLabel1, valueLabel2) {
        return new Observable(observer => {
            Observable.timer(500, 30000).subscribe(t => {

                const val1 = TrendLineService.getRandomArbitrary(0, 100);
                const val2 = 100 - val1;

                const data = [
                    {
                        'name': valueLabel1,
                        'value': val1
                    },
                    {
                        'name': valueLabel2,
                        'value': val2
                    }
                ];
                observer.next(data);
            });
        });
    }

    getSuccessCategoryObjectCount(apiToken: string, apiHeader: string, apiBase: string, api: string) {

        let headers = new HttpHeaders();

        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append(apiHeader, apiToken);

        /**
         * todo - this is specific to a certain implementation
         */
        const body = {
            'op': [
                {
                    'operation': 'count',
                    'fieldname': 'pk',
                    'outputname': 'count'
                }],
            'group':
                ['protectionInfo.storageProfileName']
        };

        return this._http.post(apiBase + api, body, {headers: headers});
    }


    getTotalObjectCount(apiToken: string, apiHeader: string, apiBase: string, api: string) {

        let headers = new HttpHeaders();

        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append(apiHeader, apiToken);

        /**
         * todo  - this is specific to a certain implementation
         */
        const body = {
            'op': [
                {
                    'operation': 'count',
                    'fieldname': 'pk',
                    'outputname': 'count'
                }]
        };

        return this._http.post(apiBase + api, body, {headers: headers});

    }

    getObjectsToBeProcessed(apiToken: string, apiHeader: string, apiBase: string, api: string,  objectId: number, pageSize: number) {

        let params = new HttpParams();

        /**
         * todo - this is specific to a certain implementation
         */
        params = params.append('sort', '[{"property": "name", "direction": "ASC"}]');
        params = params.append('from', 'hlo');
        params = params.append('pageSize', pageSize + '');


        let headers = new HttpHeaders();

        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append(apiHeader, apiToken);

        return this._http.get(apiBase + api,
            {
                headers: headers,
                params: params
            });

    }

}
