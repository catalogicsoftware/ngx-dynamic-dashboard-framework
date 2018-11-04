/**
 * Created by jayhamilton on 1/18/17.
 */
import {Injectable} from '@angular/core';
import {throwError,Observable} from 'rxjs';
import {catchError} from "rxjs/operators";
import {ErrorHandler} from '../error/error-handler';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable()
export class RuntimeService {

    watsonMicroserviceURL: string;
    connectivityTestURL: string;
    serviceVersionURL: string;
    testURL = "http://localhost:8080";

    static handleError(err: HttpErrorResponse | any) {

        const errMsg: any = {
            status: '-1',
            statusText: '',
            resource: ''
        };


        if (err.error instanceof Error) {
            errMsg.statusText = err.error.message;
            console.log('Client error');

        } else {
            errMsg.status = err.status;
            errMsg.statusText = 'A backend error occurred. In all likelihood the server/api service is not running.';
            errMsg.resource = err.url;

        }

        return throwError(ErrorHandler.getErrorObject(errMsg));

    }

    constructor(private _http: HttpClient) {
        this.configure();
    }

    configure() {

        if (environment.production) {
            this.watsonMicroserviceURL = '/classify';
            this.connectivityTestURL = '/connectTest';
            this.serviceVersionURL = '/version'
        } else {
            this.connectivityTestURL = this.testURL + '/connectTest';
            this.watsonMicroserviceURL = this.testURL + '/classify';
            this.serviceVersionURL = this.testURL + '/version';
        }

    }

    testURLResponse(url: string) {
        return this._http.get(url, {responseType: 'text'})
            .pipe(
                catchError(RuntimeService.handleError)
            );

    }

    testConnectivity(host: string, port: string) {

        let p = new HttpParams();
        p = p.append('host', host);
        p = p.append('port', port);

        return this._http.get(this.connectivityTestURL, {params: p})
            .pipe(
                catchError(RuntimeService.handleError)
            );

    }

    /**
     * Wit AI can be called directly from a web server using JSONP
     * @param {string} aiStatement
     * @returns {Observable<any>}
     */
    callWitAI(aiStatement: string) {
        console.log('running WitAi');

        if (!environment.production) {

            let p = new HttpParams();
            if (!localStorage.getItem('Wit.aiToken')) {
                return;
            }

            p = p.append('v', '20171128');
            p = p.append('q', aiStatement);
            p = p.append('access_token', localStorage.getItem('Wit.aiToken'));

            return this._http.jsonp('https://api.wit.ai/message?' + p.toString(),
                'callback'
            ).pipe(
                catchError(RuntimeService.handleError)
            );
        }
    }

    callback(data) {
        // console.log(data);

    }

    /**
     * Watson does not support JSONP for some of their APIs. This call relies on a backend that implements
     * a Watson SDK. Im my configuration I am using a Spring Boot backend with a simple REST API which calls into
     * the Watson JAVA SDK. The SDK requires a user, password and classifier, which is managed by the board configuration.
     * Here is what the backend test SDK code looks like.

     @RestController
     class WatsonClassifier{
     .......

     @CrossOrigin
     @RequestMapping("/classify")
     Classification processWatson(@RequestParam(value = "userid", defaultValue = "")
     String userid, @RequestParam(value = "password", defaultValue = "") String password,
     @RequestParam(value = "classifier_id", defaultValue = "") String classifierId,
     @RequestParam(value = "data", defaultValue = "") String data) {

        NaturalLanguageClassifier service = new NaturalLanguageClassifier();
        service.setUsernameAndPassword(userid, password);
        Classification classification = service.classify(classifierId, data).execute();
        return classification;

      }
     }
     *
     * @param {string} aiStatement
     * @returns {Observable<any>}
     */
    callWatsonAI(aiStatement: string) {
        console.log('running Watson');


        if (!localStorage.getItem('ibmwatsoncid')) {
            return;
        }

        let p = new HttpParams();
        p = p.append('userid', localStorage.getItem('ibmwatsonuid'));
        p = p.append('password', localStorage.getItem('ibmwatsonpwd'));
        p = p.append('classifier_id', localStorage.getItem('ibmwatsoncid'));
        p = p.append('data', aiStatement);


        return this._http.get(this.watsonMicroserviceURL, {
            params: p
        }).pipe(
            catchError(RuntimeService.handleError)
        );

    }
}
