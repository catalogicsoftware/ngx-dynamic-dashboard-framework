import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';


export class DetailResolverService implements Resolve <DetailModel> {


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DetailModel> | Promise<DetailModel> | DetailModel {

        return null;
    };

}
