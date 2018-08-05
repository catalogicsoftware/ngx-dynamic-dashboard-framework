import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class OptionsService {
    constructor(private _http: HttpClient) {
    }

    public getBoardOptions() {
        let options = {'enableHover': false};

        let databaseOptions = JSON.parse(localStorage.getItem('dashboardOptions'));

        if (databaseOptions == null) {
            return options;
        } else {
            return databaseOptions;
        }
    }

    public setBoardOptions(options: any) {
        localStorage.removeItem('dashboardOptions');
        return localStorage.setItem('dashboardOptions', JSON.stringify(options));

    }
}
