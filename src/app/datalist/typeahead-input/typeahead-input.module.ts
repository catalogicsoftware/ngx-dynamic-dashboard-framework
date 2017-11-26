import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {TypeAheadInputComponent} from './typeahead-input.component';

import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule

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

