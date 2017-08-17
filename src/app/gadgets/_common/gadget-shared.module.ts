import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GadgetHeaderComponent} from './gadget-header-component';
import {GadgetOperationComponent} from './gadget-operation-control-component';
import {HelpModalComponent} from './help-modal-component';
import {VisDrillDownComponent} from './vis-drill-down-component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [

        GadgetHeaderComponent,
        GadgetOperationComponent,
        HelpModalComponent,
        VisDrillDownComponent

    ],
    exports: [
        GadgetHeaderComponent,
        GadgetOperationComponent,
        HelpModalComponent,
        VisDrillDownComponent
    ]
})
export class GadgetSharedModule {
}
