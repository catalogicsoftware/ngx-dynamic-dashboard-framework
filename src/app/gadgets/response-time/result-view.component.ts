
import {Component, Input} from "@angular/core";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'connection-result-view-component',
    moduleId: module.id,
    templateUrl: './result-view.html',
    styleUrls: ['../_common/styles-gadget.css'],
    animations: [

        trigger(
            'fade',
            [
                transition(':enter', [   // :enter is alias to 'void => *'
                    style({opacity: 0}),
                    animate(1000, style({opacity: 1}))
                ]),
                transition(':leave', [   // :leave is alias to '* => void'
                    animate(300, style({opacity: 0}))
                ])
            ])
    ]

})
export class ResultViewComponent{


    @Input() connectionResult: any;

    detailMessageOpen = false;


    public toggleMessageDetail(): void {

        this.detailMessageOpen = !this.detailMessageOpen;

    }

}