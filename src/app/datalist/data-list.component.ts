import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-data-list',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./styles.css']
})


export class DataListComponent {

    @Input() objectList: any[];
    @Input() objectTitleList: string[];
    @Input() placeHolderText: string;
    @Output() actionEventRaised: EventEmitter<ActionInterface> = new EventEmitter();

    emitActionEvent(action: ActionInterface) {
        this.actionEventRaised.emit(action);

    }
}

