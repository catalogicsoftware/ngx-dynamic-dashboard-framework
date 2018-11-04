/**
 * Created by jayhamilton on 6/24/17.
 */
import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EndPointModel} from "./service.model";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable()
export class ConnectionService {

    connectivityTestURL: string;

    constructor(private _http: HttpClient) {
        this.configure();
    }

    /**
     * TODO - the connectivityTestURL should be based on the Endpoint object that currently
     * comes from the board configuration. However, in order for this to be more modular
     * the Endpoint object should be managed by the gadget config form. The URL, when run in production mode, is
     * currently assumes to be the microservice jar file that runs the framework. The GUI should allow
     * the user to define whether the URL is internal or remote.
     */
    configure() {

        if (environment.production) {
            /**
             * todo - consider setting this value if a user checks and option in the gadget's form
             * that indicate the user elects to use the interal api call.
             */

            this.connectivityTestURL = '/connectTest';
        } else {
            /**
             * todo - consider sett this from the gadget form
             */

            this.connectivityTestURL = 'http://localhost:8080/connectTest';
        }

    }

    testConnectivity(endPoints: Array<EndPointModel>) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept':'application/json'
            })
        };
        return this._http.post<Array<EndPointModel>>(this.connectivityTestURL, endPoints, httpOptions)
            .pipe(
                catchError(RuntimeService.handleError)
            );

    }

}
