import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AddGadgetComponent} from './add-gadget-component';
import {AddGadgetService} from './service';
import {FacetModule} from './facet/facet.module';
import {MatButtonModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FacetModule,
        MatButtonModule
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

