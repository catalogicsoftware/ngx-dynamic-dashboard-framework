import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AddGadgetComponent} from './add-gadget-component';
import {AddGadgetService} from './service';
import {HttpClientModule} from '@angular/common/http';
import {DataListModule} from '../datalist/data-list.module';

@NgModule({
    imports: [
        CommonModule,
        DataListModule,
        HttpClientModule
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

