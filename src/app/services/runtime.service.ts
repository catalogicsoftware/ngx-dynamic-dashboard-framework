/**
 * Created by jayhamilton on 1/18/17.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {ErrorHandler} from '../error/error-handler';


@Injectable()
export class RuntimeService {

    private sessionid: string;
    private credentials = {url: '', user: '', password: ''};
    private subdoc: any;

    static handleError(error: Response | any) {

        console.error(error);

        let errMsg: string;
        if (error instanceof Response) {

            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {

            errMsg = error.message ? error.message : error.toString();

        }

        return Observable.throw(ErrorHandler.getErrorObject(errMsg));

    }

    constructor(private _http: Http) {
    }

    postForECXSessionId(_credentials: any) {
        const headers = new Headers();

        this.credentials = _credentials;

        /** todo
         * centralize header management
         */
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Authorization', 'Basic ' + B64encode(this.credentials.user + ':' +
                this.credentials.password));

        return this._http.post(this.credentials.url, '', {headers: headers})
            .map(response => response.json());

    }

    public setSessionId(sessionId: string) {
        this.sessionid = sessionId;
    }

    public getSessionId() {
        return this.sessionid;
    }

    postForXmonSessionStart(_credentials: any, urlHost: string, url: string) {

        const headers = new Headers();

        this.credentials = _credentials;

        /** todo
         * credential need to be handled in a centralized manner that includes encoding and encryption.
         * Board configuration will include an endpoint registration tab for this purpose.
         */

        headers.append('x-ecomon-master', urlHost);
        headers.append('Access-Control-Allow-Origin', '*');

        if (!this.subdoc) {
            this.subdoc = this._http.post(url
                + '/ecomon/session?uid='
                + this.credentials.user
                + '&pwd='
                + this.credentials.password, '', {headers: headers})
                .timeout(60000)
                .map(response => response.json())
                .publishReplay(1)
                .refCount()
                .catch(RuntimeService.handleError);
        }

        return this.subdoc;

    }

    clearSubscriptionDocCache() {
        this.subdoc = null;
    }

    subscribeToMetricWithSubdoc(_subdoc: any, _sessionId: string, urlHost: string, url: string) {

        /** todo
         * centralize header management
         */
        const headers = new Headers();

        headers.append('x-ecomon-master', urlHost);
        headers.append('x-ecomon-monsid', _sessionId);
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Content-Type', 'application/json');

        return this._http.post(url + '/ecomon/subscribe', _subdoc, {headers: headers})
            .map(response => {
                response.json();
                console.log(response);

            })
            .catch(RuntimeService.handleError);

    }

    getData(monSid: string, roomNum: string, url: string) {
        const observable = new Observable(observer => {

            const socket = io(url, {
                query: {
                    _accessToken: monSid,
                    _roomNum: roomNum
                }
            });


            socket.on('message', (data) => {
                observer.next(data);
            });

            socket.on('disconnect', () => {
                console.log('Attempting to disconnect from socket');
                socket.disconnect();
            });


            return () => {
                console.log('returning  to disconnect from socket');
                socket.disconnect();
            };
        });
        return observable;
    }
}

function B64encode(data: string) {

    let c1, c2, c3;
    const Base64 = {
        _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=', encode: function (e) {
            let t = '';
            let n, r, i, s, o, u, a;
            let f = 0;
            e = Base64._utf8_encode(e);
            while (f < e.length) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                i = e.charCodeAt(f++);
                s = n >> 2;
                o = (n & 3) << 4 | r >> 4;
                u = (r & 15) << 2 | i >> 6;
                a = i & 63;
                if (isNaN(r)) {
                    u = a = 64;
                } else if (isNaN(i)) {
                    a = 64;
                }
                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
            }
            return t
        }, decode: function (e) {
            let t = '';
            let n, r, i;
            let s, o, u, a;
            let f = 0;
            e = e.replace(/[^A-Za-z0-9\+\/\=]/g, '');
            while (f < e.length) {
                s = this._keyStr.indexOf(e.charAt(f++));
                o = this._keyStr.indexOf(e.charAt(f++));
                u = this._keyStr.indexOf(e.charAt(f++));
                a = this._keyStr.indexOf(e.charAt(f++));
                n = s << 2 | o >> 4;
                r = (o & 15) << 4 | u >> 2;
                i = (u & 3) << 6 | a;
                t = t + String.fromCharCode(n);
                if (u != 64) {
                    t = t + String.fromCharCode(r)
                }
                if (a != 64) {
                    t = t + String.fromCharCode(i)
                }
            }
            t = Base64._utf8_decode(t);
            return t;
        }, _utf8_encode: function (e) {
            e = e.replace(/\r\n/g, '\n');
            let t = '';
            for (let n = 0; n < e.length; n++) {
                const r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r);
                } else if (r > 127 && r < 2048) {
                    t += String.fromCharCode(r >> 6 | 192);
                    t += String.fromCharCode(r & 63 | 128)
                } else {
                    t += String.fromCharCode(r >> 12 | 224);
                    t += String.fromCharCode(r >> 6 & 63 | 128);
                    t += String.fromCharCode(r & 63 | 128)
                }
            }
            return t;
        }, _utf8_decode: function (e) {
            let t = '';
            let n = 0;
            let r = c1 = c2 = 0;
            while (n < e.length) {
                r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r);
                    n++;
                } else if (r > 191 && r < 224) {
                    c2 = e.charCodeAt(n + 1);
                    t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                    n += 2;
                } else {
                    c2 = e.charCodeAt(n + 1);
                    c3 = e.charCodeAt(n + 2);
                    t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    n += 3;
                }
            }
            return t;
        }
    }

    return Base64.encode(data);

}
