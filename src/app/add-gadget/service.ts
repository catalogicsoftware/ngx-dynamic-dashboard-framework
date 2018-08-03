/**
 * Created by jayhamilton on 2/7/17.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment'

@Injectable()
export class AddGadgetService {

    env: any;

    constructor(private _http: HttpClient) {
        this.env = environment;
    }

    getGadgetLibrary() {
        let gadgetLibraryJson = '';

        if (this.env.production == true) {
            gadgetLibraryJson = 'gadget-library-model-prod.json';

        } else {
            gadgetLibraryJson = 'gadget-library-model.json';
        }
        return this._http.get<GadgetLibraryResponse>('/assets/api/' + gadgetLibraryJson);
    }

}
