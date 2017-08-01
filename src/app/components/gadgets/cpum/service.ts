import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {StompWebSocket} from './stompws';


@Injectable()
export class CPUMService {

    constructor(private _http: Http) {
    }


    getData() {
        const observable = new Observable(observer => {

            observer.next(null);

            return () => {
                console.log('returning  to disconnect from socket');
            };
        });
        return observable;
    }

    public getWebSocket(socketUrl: string, topic: string, broker: string) {
        const socket: StompWebSocket = new StompWebSocket(socketUrl, topic, broker);
        socket.init();
        return socket;
    }

}
