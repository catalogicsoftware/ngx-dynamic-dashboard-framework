import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AddGadgetComponent} from './add-gadget-component';
import {AddGadgetService} from './service';
import {HttpClientModule} from '@angular/common/http';
import {DataListModule} from '../datalist/data-list.module';
import {MatButtonModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        DataListModule,
        HttpClientModule,
        MatButtonModule,
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

