/**
 * Created by jayhamilton on 1/18/17.
 */
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {ErrorHandler} from '../error/error-handler';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';


@Injectable()
export class RuntimeService {

    // watsonMicroserviceURL = 'http://localhost:8080/classify';
    watsonMicroserviceURL = '/classify';
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
            errMsg.statusText = 'A backend error occurred';
            errMsg.resource = err.url;
            console.log('Backend error');


        }
        console.log(err);

        return Observable.throw(ErrorHandler.getErrorObject(errMsg));

    }

    constructor(private _http: HttpClient) {
    }

    testURLResponse(url: string) {
        return this._http.get(url, {responseType: 'text'})
            .catch(RuntimeService.handleError);

    }


    /**
     * Wit AI can be called directly from a web server using JSONP
     * @param {string} aiStatement
     * @returns {Observable<any>}
     */
    callWitAI(aiStatement: string) {
        console.log('running WitAi');

        let p = new HttpParams();

        if (!localStorage.getItem('Wit.aiToken')) {
            return;
        }

        p = p.append('v', '20171128');
        p = p.append('q', aiStatement);
        p = p.append('access_token', localStorage.getItem('Wit.aiToken'));

        return this._http.jsonp('https://api.wit.ai/message?' + p.toString(),
            'callback'
        ).catch(RuntimeService.handleError);
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
        }).catch(RuntimeService.handleError);

    }
}
