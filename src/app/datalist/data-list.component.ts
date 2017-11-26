import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';

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
    @Input() layoutColumnOneWidth: string;
    @Input() layoutColumnTwoWidth: string;
    @Input() customTemplate: TemplateRef<any>;
    @Output() actionEventRaised: EventEmitter<ActionInterface> = new EventEmitter();

    emitActionEvent(action: ActionInterface) {
        this.actionEventRaised.emit(action);

    }
}

