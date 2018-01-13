import {Component, OnInit} from '@angular/core';
import {ToastService} from './toast.service';
import {Message} from './message';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
    }

    dismiss(id) {
        this._toastService.dismissMessage(id);
    }

}
