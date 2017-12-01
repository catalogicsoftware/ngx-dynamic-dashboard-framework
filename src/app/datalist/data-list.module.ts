import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FacetModule} from '../facet/facet.module';
import {HttpClientModule} from '@angular/common/http';
import {TypeAheadInputModule} from '../typeahead-input/typeahead-input.module';
import {DataListComponent} from './data-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        CommonModule,
        FacetModule,
        TypeAheadInputModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    declarations: [
        DataListComponent
    ],
    providers: [],
    exports: [
        DataListComponent
    ]
})
export class DataListModule {
}
