import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ObjectListComponent} from './object-list-component';
import {MatButtonModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
    ],
    declarations: [
        ObjectListComponent
    ],
    providers: [

    ],
    exports: [
        ObjectListComponent
    ]
})
export class ObjectListModule {
}

