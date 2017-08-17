import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AddGadgetComponent} from './add-gadget-component';
import {AddGadgetService} from './service';
import {FacetModule} from './facet/facet.module';
import {MdButtonModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FacetModule,
        MdButtonModule
    ],
    declarations: [
        AddGadgetComponent
    ],
    providers: [
        AddGadgetService
    ],
    exports: [
        AddGadgetComponent
    ]
})
export class AddGadgetModule {
}

