import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCheckboxModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {DetailComponent} from './detail.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatCheckboxModule
    ],
    declarations: [
        DetailComponent
    ],
    providers: [

    ],
    exports: [
        DetailComponent
    ]
})
export class DetailModule {
}

