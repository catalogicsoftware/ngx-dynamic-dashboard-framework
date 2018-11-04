import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';

/**
 The grid is primarily controlled by MenuService Events. You can change the behavior by
 changing the MenuComponent and have it call methods within the Grid component via Output Events
 within the Menu component or by using the @ViewChild approach.

 In the current code, the MenuService is shared by the GridComponent and MenuComponent.
 The MenuComponent relays events from the various components that make up the MenuComponent.
 The GridComponent listens for those events via an Observable. The GridComponent will also
 raise/emit an event that will be picked up by the MenuComponent via the MenuService through an Observable as well.
 */

@Injectable()
export class MenuEventService {

    private menuSubject: Subject<IEvent> = new Subject<IEvent>();
    private gridSubject: Subject<IEvent> = new Subject<IEvent>();
    private subscribers: Array<Subject<string>> =[];

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

    addSubscriber(subscriber:any){
        this.subscribers.push(subscriber);
    }
    unSubscribeAll(){

        this.subscribers.forEach(subscription=>{
            subscription.unsubscribe();
        });

        this.subscribers.length = 0;

    }
}
