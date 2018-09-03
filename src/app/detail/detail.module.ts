import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCheckboxModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {DetailComponent} from './detail.component';
import {DetailService} from "./service";
import {FilterPipe} from "./filter.pipe";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatCheckboxModule
    ],
    declarations: [
        DetailComponent,
        FilterPipe
    ],
    providers: [
        DetailService
    ],
    exports: [
        DetailComponent
    ]
})
export class DetailModule {
}

