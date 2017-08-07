
import {Component, ElementRef} from '@angular/core';
/**
 * Created by jayhamilton on 6/27/17.
 */
@Component({
    moduleId: module.id,
    selector: 'app-search-result',
    template: `
       <!--
        <div class='ui basic segment' style='background-color:white'
             *ngFor='let gadgetItemData of gadgetLibraryData; let i = index'>
            <div class='ui large middle aligned divided list'>
                <div class='item'>
                    <div class='right floated content'>
                        <div class='ui small blue button' (click)='addGadget(gadgetLibraryData[i])'>Add</div>
                    </div>
                    <img class='ui image' src='{{gadgetLibraryData[i].icon}}'>
                    <div class='content'>
                        <div class='header'>{{gadgetLibraryData[i].name}} Gadget</div>
                        {{gadgetLibraryData[i].description}}
                    </div>
                </div>
            </div>
        </div>
        -->
    `,
    styleUrls: ['../../_common/styles-gadget.css']
})
export class SearchResultComponent {

    constructor(myElement: ElementRef) {


    }
}
