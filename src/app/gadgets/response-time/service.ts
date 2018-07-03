/**
 * Created by jayhamilton on 6/24/17.
 */
import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ServiceModel} from "./service.model";

@Injectable()
export class ConnectionService {

    connectivityTestURL: string;

    constructor(private _http: HttpClient) {
    }

    get() {
        return this._http.get('/assets/api/connection-model.json')
            .catch(RuntimeService.handleError);
    }

    testConnectivity(serviceModel: ServiceModel) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this._http.post<ServiceModel>(this.connectivityTestURL, serviceModel, httpOptions)
            .catch(RuntimeService.handleError);

    }

    testConnectivityWGet(serviceModel: ServiceModel) {
        let p = new HttpParams();
        p = p.append('host', serviceModel.host);
        p = p.append('port', serviceModel.ports[0]);

        return this._http.get(this.connectivityTestURL, {params: p})
            .catch(RuntimeService.handleError);
    }
}
