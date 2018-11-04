import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {timer, Observable} from 'rxjs';
import {catchError} from "rxjs/operators";
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EdgeService {

    constructor(private _http: HttpClient) {
    }

    getSelectedProxy() {
        return this._http.get('http://localhost:9090/select')
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }

    // http://localhost:9090/service-instances/vadp'
    getMicroServices(url: string) {
        return new Observable(observer => {
            timer(500, 5000).subscribe(t => {
                this._http.get(url).subscribe(data => {

                    observer.next(data);
                }),
                    catchError(RuntimeService.handleError);
            });
        });
    }

    getTaskCount(uri: string) {
        console.log('Getting task count for: ' + uri);
        return this._http.get<number>(uri + '/task')
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }

    seedProxiesWithWork() {
        return this._http.post('http://localhost:9090/run', null, null)
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }

    runJob(uri: string) {
        return this._http.post(uri + '/run', null, null)
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }

    getGraphInfo() {
        return this._http.get('/assets/api/disk-model.json')
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }
}


