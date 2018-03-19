import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCheckboxModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {GadgetDetailComponent} from './gadget-detail.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatCheckboxModule
    ],
    declarations: [
        GadgetDetailComponent
    ],
    providers: [

    ],
    exports: [
        GadgetDetailComponent
    ]
})
export class GadgetDetailModule {
}

