import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class MenuEventService {

    private menuSubject: Subject<IEvent> = new Subject<IEvent>();
    private gridSubject: Subject<IEvent> = new Subject<IEvent>();

    constructor() {
    }

    raiseMenuEvent(event: IEvent) {
        this.menuSubject.next(event);
    }

    listenForMenuEvents(): Observable<IEvent> {
        return this.menuSubject.asObservable();
    }

    raiseGridEvent(event: IEvent) {
        this.menuSubject.next(event);
    }

    listenForGridEvents(): Observable<IEvent> {
        return this.gridSubject.asObservable();
    }
}
