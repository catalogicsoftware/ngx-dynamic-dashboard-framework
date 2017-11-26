/**
 * Created by jayhamilton on 1/24/17.
 */
import {
    Component, Output, EventEmitter, Input
} from '@angular/core';

import {
    style, trigger, animate, transition
} from '@angular/animations';

@Component({
    selector: 'app-object-list',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./styles.css'],
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
    ],

})
export class ObjectListComponent {

    @Input() objectList: any[];
    @Output() actionEventRaised: EventEmitter<ActionInterface> = new EventEmitter();

    color = 'white';
    objectListCopy: any[] = [];

    filterListByTags(filterList: string[]) {

        this.copyObjectList();
        this.objectList = this.objectListCopy.filter(object => {

            let tagFound = false;

            if (!filterList.length) {
                return true;
            } else {
                object.tags.forEach(tag => {

                    filterList.forEach(filter => {

                        if (tag.name.toLocaleLowerCase() === filter.toLocaleLowerCase()) {
                            tagFound = true;
                        }
                    });
                });

                return tagFound;
            }
        });

    }

    filterListBySearchString(searchString: string) {

        this.copyObjectList();
        this.objectList = this.objectListCopy.filter(object => {

            if (searchString.localeCompare('') === 0) {
                return true;
            } else {

                if (object.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {

                    return true;
                }
            }

        });
    }

    emitActionEvent(actionObject, actionName) {
        this.actionEventRaised.emit({'item': actionObject, 'name': actionName});
    }

    /**
     * todo - find a better way to manage the list that is displayed and filtered.
     */
    copyObjectList() {
        if (this.objectListCopy.length === 0) {
            this.objectList.forEach(item => {
                this.objectListCopy.push(item);
            });
        }
    }
}
