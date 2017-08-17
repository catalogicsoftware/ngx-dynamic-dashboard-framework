/**
 * Created by jayhamilton on 2/7/17.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AddGadgetService {

    constructor(private _http: Http) {}

    getGadgetLibrary() {
        return this._http.request('/assets/api/gadget-library-model.json')
            .map(res => res.json());
    }

}
