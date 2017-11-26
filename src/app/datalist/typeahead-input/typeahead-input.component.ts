import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';

/**
 * Created by jayhamilton on 2/26/17.
 */

@Component({
    moduleId: module.id,
    selector: 'app-typeahead-input',
    templateUrl: './view.html',
})
export class TypeAheadInputComponent {

    @Input() searchList: string[];
    @Input()  placeHolderText;
    @Output() selectionEvent = new EventEmitter<string>();


    public query = '';
    public filteredList = [];
    public elementRef;

    constructor(myElement: ElementRef) {
        this.elementRef = myElement;

    }

    filter() {
        if (this.query !== '') {
            this.filteredList = this.searchList.filter(function (el) {
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredList = [];
        }

        this.selectionEvent.emit(this.query);
    }

    select(item) {
        this.query = item;
        this.filteredList = [];
        this.selectionEvent.emit(item);
    }
}
