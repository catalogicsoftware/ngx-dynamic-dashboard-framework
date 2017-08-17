import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FacetComponent} from './facet-component';
import {FilterListComponent} from './filter-list-component';
import {FilterTagComponent} from './filter-tag-component';
import {SearchComponent} from './search-component';
import {SearchResultComponent} from './search-result-component';
import {CapitalizeFirstPipe} from './capitalize-first-character-pipe';
import {MdCheckboxModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdCheckboxModule
    ],
    declarations: [
        FacetComponent,
        FilterListComponent,
        FilterTagComponent,
        SearchComponent,
        SearchResultComponent,
        CapitalizeFirstPipe
    ],
    exports: [
        FacetComponent,
        FilterListComponent,
        FilterTagComponent,
        SearchComponent,
        SearchResultComponent,
        CapitalizeFirstPipe
    ]
})
export class FacetModule {
}