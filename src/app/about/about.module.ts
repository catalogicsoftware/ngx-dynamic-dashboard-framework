import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from './about-component';
import {AboutService} from "./service";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [AboutComponent],
    exports: [AboutComponent],
    providers: [AboutService]
})
export class AboutModule {
}
