/**
 * Created by jayhamilton on 2/7/17.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AddGadgetService {

    constructor(private _http: HttpClient) {}

    getGadgetLibrary() {
        return this._http.get<GadgetLibraryResponse>('/assets/api/gadget-library-model.json');
    }

}
