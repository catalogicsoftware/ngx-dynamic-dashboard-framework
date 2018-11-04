import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';


export class DetailResolver implements Resolve <DetailModel> {

    data: DetailModel;

    constructor(detailData: DetailModel) {
        this.data = detailData;
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DetailModel> | Promise<DetailModel> | DetailModel {

        return this.data;
    };

}
