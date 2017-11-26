import {Facet} from './facet-model';
import {
    Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';

import {
    style, state, trigger, animate, transition
} from '@angular/animations';

/**
 * Created by jayhamilton on 7/11/17.
 */
@Component({
    moduleId: module.id,
    selector: 'app-facet',
    template: `

        <hr style='max-width: 100%; margin-left:0;'>
        <br>
        <div class='ui container grid'>
            <div class='eight wide column' style="margin-left: 0 !important;padding-left: 0 !important;">
                <h4>{{facet.name}}</h4>
            </div>
            <div class='eight wide column'>
                <div class='ui top right attached label' style='background-color: whitesmoke'>
                    <i
                        class='chevron icon' [ngClass]= "{'up': facetOpen == 'in', 'down': facetOpen=='out'}"
                        (click)='toggleAccordion()'
                        style='color:grey'>
                    </i>
                </div>
            </div>
        </div>
        <div [@accordion]='facetOpen'>
            <table class='ui very basic table' [@accordion2]='facetOpen'>
                <tbody>
                <tr *ngFor='let tag of facet.tags'>
                    <td style="width: 35px !important">
                        <mat-checkbox (click)='tagSelect(tag.name)'></mat-checkbox>
                        <!--<input type='checkbox' (click)='tagSelect(tag.name)'>-->
                    </td>
                    <td style='color:grey'>{{tag.name}} &nbsp;( {{tag.count}} )</td>
                </tr>
                </tbody>
            </table>
        </div>
        <br>

    `,
    styleUrls: ['./styles.css'],
    animations: [

        trigger('accordion', [
            state('in', style({
                height: '*'
            })),
            state('out', style({
                opacity: '0',
                height: '0px'
            })),
            transition('in => out', animate('700ms ease-in-out')),
            transition('out => in', animate('300ms ease-in-out'))
        ]),
        trigger('accordion2', [
            state('in', style({
                height: '*'
            })),
            state('out', style({
                opacity: '0',
                height: '0px'
            })),
            transition('in => out', animate('300ms ease-in-out')),
            transition('out => in', animate('800ms ease-in-out'))
        ])
    ]
})
export class FacetComponent implements OnInit {
    @Output() tagSelectEvent: EventEmitter<any> = new EventEmitter();
    @Input() facet: Facet;
    @Input() openFacet: boolean;

    facetOpen: string;

    constructor() {
    }

    ngOnInit() {
        if (this.openFacet) {
            this.facetOpen = 'in';
        }else {
            this.facetOpen = 'out';
        }
    }

    toggleAccordion() {
        this.facetOpen = this.facetOpen === 'out' ? 'in' : 'out';

    }

    tagSelect(tagName) {
        this.tagSelectEvent.emit(tagName);
    }

}
