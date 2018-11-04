import {Injectable} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {RuntimeService} from '../../services/runtime.service';
import {HttpClient} from '@angular/common/http';
import {catchError} from "rxjs/operators";

@Injectable()
export class TrendLineService {
    static seedData() {

        const array = [];
        for (let i = 0; i < 25; i++) {
            array.push({
                'name': i.toString(),
                'value': 0
            });
        }
        return array;
    }
    static retrieveData() {

        const currentDate = new Date();
        const time = TrendLineService.getDay(
            currentDate.getDay()) + ':' +
            currentDate.getHours() + ':' +
            currentDate.getMinutes() + ':' +
            currentDate.getSeconds();

        return {

            'name': time,
            'value': TrendLineService.getRandomArbitrary(5, 20)
        };

    }
    static getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    static getDay(dayOfWeek: number) {

        switch (dayOfWeek) {
            case 0:
                return 'sun';
            case 1:
                return 'mon';
            case 2:
                return 'tue';
            case 3:
                return 'wed';
            case 4:
                return 'thur';
            case 5:
                return 'fri';
            case 6:
                return 'sat';
        }
    }
    constructor(private _http: HttpClient) {
    }

    public get(collectors: any[]) {
        return new Observable(observer => {
            timer(500, 5000).subscribe(t => {

                const data = [];
                collectors.forEach(collector => {
                    data.push(TrendLineService.retrieveData());
                });

                observer.next(data);
            });
        });
    }

    public stop(subscription: any) {
        subscription.unsubscribe();
    }

    getHelpTopic() {

        return this._http.get('/assets/api/trendline-help-model.json')
            .pipe(
                catchError(RuntimeService.handleError)
            );

    }
}
