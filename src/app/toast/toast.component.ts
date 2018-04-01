import {Component, OnInit} from '@angular/core';
import {ToastService} from './toast.service';
import {Message} from './message';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TrendLineService} from '../gadgets/trend-line/service';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css'],
    animations: [

        trigger('showHide', [
            transition(':enter', [
                style({opacity: 0}),
                animate('500ms', style({opacity: 1}))
            ]),
            transition(':leave', [
                style({opacity: 1}),
                animate('500ms', style({opacity: 0}))
            ])
        ])]
})
export class ToastComponent implements OnInit {

    messages: Array<Message>;

    constructor(private _toastService: ToastService) {
    }


    ngOnInit() {

        this.messages = this._toastService.getMessages();


        Observable.timer(0, 7000).subscribe(t => {

            this.messages.forEach(message => {

                this.dismiss(message.id);

            });


        });
    }

    dismiss(id) {
        this._toastService.dismissMessage(id);
    }

}
