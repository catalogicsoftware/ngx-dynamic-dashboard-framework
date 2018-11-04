import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RuntimeService} from "../services/runtime.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class AboutService {

    env: any;

    constructor(private _http: HttpClient) {
        this.env = environment;
    }


    getAPIVersion() {

        let url: string;

        if (this.env.production == true) {

            url = '/version';

        } else {

            url = '/assets/api/version-model.json';

        }

        return this._http.get(url)
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }

}