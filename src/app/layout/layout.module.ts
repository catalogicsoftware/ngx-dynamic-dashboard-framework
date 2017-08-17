import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardLayoutManagerComponent} from './layout-component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [BoardLayoutManagerComponent],
    exports: [BoardLayoutManagerComponent]
})
export class LayoutModule {
}
