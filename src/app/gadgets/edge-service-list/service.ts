import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EdgeService {

    constructor(private _http: Http) {
    }

    getSelectedProxy() {
        return this._http.get('http://localhost:9090/select')
            .catch(RuntimeService.handleError);
    }
    // http://localhost:9090/service-instances/vadp'
    getMicroServices(url: string) {
        return new Observable(observer => {
            Observable.timer(500, 5000).subscribe(t => {
                this._http.get(url)
                    .map(res => res.json())
                    .catch(RuntimeService.handleError).subscribe(data => {

                    observer.next(data);
                });
            });
        });
    }

    getTaskCount(uri: string) {
        console.log('Getting task count for: ' + uri);
        return this._http.get(uri + '/task')
            .map(res => res.json())
            .catch(RuntimeService.handleError);
    }

    seedProxiesWithWork() {
        return this._http.post('http://localhost:9090/run', null , null)
            .map(res => res.json())
            .catch(RuntimeService.handleError);
    }

    runJob(uri: string) {
        return this._http.post(uri + '/run', null , null)
            .map(res => res.json())
            .catch(RuntimeService.handleError);
    }

    getGraphInfo() {
        return this._http.request('/assets/api/disk-model.json')
            .map(res => res.json())
            .catch(RuntimeService.handleError);
    }
}


