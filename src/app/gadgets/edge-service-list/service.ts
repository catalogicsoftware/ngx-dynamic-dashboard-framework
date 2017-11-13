import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EdgeService {

    constructor(private _http: HttpClient) {
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
                    .catch(RuntimeService.handleError).subscribe(data => {

                    observer.next(data);
                });
            });
        });
    }

    getTaskCount(uri: string) {
        console.log('Getting task count for: ' + uri);
        return this._http.get(uri + '/task')
            .catch(RuntimeService.handleError);
    }

    seedProxiesWithWork() {
        return this._http.post('http://localhost:9090/run', null , null)
            .catch(RuntimeService.handleError);
    }

    runJob(uri: string) {
        return this._http.post(uri + '/run', null , null)
            .catch(RuntimeService.handleError);
    }

    getGraphInfo() {
        return this._http.get('/assets/api/disk-model.json')
            .catch(RuntimeService.handleError);
    }
}


