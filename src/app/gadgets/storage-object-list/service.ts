/**
 * Created by jayhamilton on 6/24/17.
 */
import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class StorageService {

    constructor(private _http: HttpClient) {
    }

    get() {
        return this._http.get('/assets/api/storage-model.json')
            .catch(RuntimeService.handleError);
    }
}
