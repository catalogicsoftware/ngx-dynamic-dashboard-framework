import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AddGadgetService} from '../add-gadget/service';
import {Facet, Tag} from './facet-model';

/**
 * Created by jayhamilton on 6/27/17.
 */
@Component({
    moduleId: module.id,
    selector: 'app-filter-list',
    template: `
        <br>
        <div *ngFor='let facet of facet_tags ;let i = index'>

            <app-facet [facet]='facet' (tagSelectEvent)='tagSelect($event)' [openFacet]='i < 2'></app-facet>

        </div>
    `,
    styleUrls: ['./styles.css']
})
export class FilterListComponent {
    @Output() tagSelectEvent: EventEmitter<any> = new EventEmitter();
    @Input() facet_tags: Array<Facet>;

    tagSelect(tagName) {

        this.tagSelectEvent.emit(tagName);

    }
}
