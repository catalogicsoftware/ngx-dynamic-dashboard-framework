import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorHandlerComponent} from './error-handler.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ErrorHandlerComponent],
    exports: [ErrorHandlerComponent]
})
export class ErrorHandlerModule {
}
