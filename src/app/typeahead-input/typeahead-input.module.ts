import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {TypeAheadInputComponent} from './typeahead-input.component';

import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatIconModule, MatInputModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule

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

