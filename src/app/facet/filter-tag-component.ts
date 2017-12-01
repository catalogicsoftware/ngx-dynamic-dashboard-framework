import { Component, EventEmitter, Output} from '@angular/core';

import {
    style, trigger, animate, transition
} from '@angular/animations';
/**
 * Created by jayhamilton on 6/27/17.
 */
@Component({
    moduleId: module.id,
    selector: 'app-filter-tag',
    template: `
        <div class='ui basic segment' style='background-color:white; min-height: 4.5em; border-radius:5px'>
            <div class='ui large circular labels'>
               <a class='ui label' [@showHideAnimation] *ngFor='let tag of filterList'>
                    {{tag}}
                </a>
            </div>
        </div>
    `,
    styleUrls: ['../gadgets/_common/styles-gadget.css'],
    animations: [
        trigger(
            'showHideAnimation',
            [
                transition(':enter', [   // :enter is alias to 'void => *'
                    style({opacity: 0}),
                    animate(750, style({opacity: 1}))
                ]),
                transition(':leave', [   // :leave is alias to '* => void'
                    animate(750, style({opacity: 0}))
                ])
            ])
    ]

})
export class FilterTagComponent {

    @Output() updateFilterListEvent = new EventEmitter<any>();

    filterList: Array<string> = [];

    constructor() {
    }

    updateFilterList(filter) {

        filter = filter.toLocaleLowerCase();

        const index: number = this.filterList.indexOf(filter);
        if (index !== -1) {
            this.filterList.splice(index, 1);
        } else {
            this.filterList.push(filter);
        }

        this.updateFilterListEvent.emit(this.filterList);

    }
}
