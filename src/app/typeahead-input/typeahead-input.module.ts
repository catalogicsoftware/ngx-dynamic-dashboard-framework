import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {TypeAheadInputComponent} from './typeahead-input.component';
import {FormsModule} from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        FormsModule

    ],
    declarations: [
        TypeAheadInputComponent
    ],
    providers: [
    ],
    exports: [
        TypeAheadInputComponent
    ]
})
export class TypeAheadInputModule {
}

