import {
    Component, Input
} from '@angular/core';

import {
    style, trigger, animate, transition
} from '@angular/animations';

import {ErrorObject} from './error-model';



@Component({
    moduleId: module.id,
    selector: 'app-error-handler',
    templateUrl: './view.html',
    styleUrls: ['./styles-error.css'],
    animations: [

        trigger('error', [
            transition(':enter', [
                style({opacity: 0}),
                animate('1000ms', style({opacity: 1}))
            ]),
            transition(':leave', [
                style({opacity: 1}),
                animate('1000ms', style({opacity: 0}))
            ])
        ])
    ]
})
export class ErrorHandlerComponent {
    @Input() errorObject: ErrorObject;
    @Input() errorExists: boolean;

    constructor() {

    }
    public closeMessage() {

        this.errorExists = false;
    }

}

