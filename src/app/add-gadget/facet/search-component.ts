import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';

/**
 * Created by jayhamilton on 2/26/17.
 */

@Component({
    moduleId: module.id,
    selector: 'app-search',
    template: `

        <h3>Search Results For</h3>
        <hr>
        <br>
        <div class='ui category search'>
            <div class='ui icon input'>
                <input class='prompt' type='text' placeholder='Search...' [(ngModel)]=query (keyup)=filter()>
                <i class='search icon'></i>
            </div>
        </div>
        <div class='suggestions' *ngIf='filteredList.length > 0'>

            <ul style='list-style-type:none; background: white; border-radius: 7px;'>
                <li style='padding:5px' *ngFor='let item of filteredList'>
                    <a (click)='select(item)'>{{item}}</a>
                </li>
            </ul>
        </div>

    `,
    styleUrls: ['../styles.css']
})
export class SearchComponent {

    @Input() searchList: string[];
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
    }

    select(item) {
        this.query = item;
        this.filteredList = [];
        this.selectionEvent.emit(item);
    }
}
