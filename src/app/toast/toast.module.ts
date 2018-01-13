import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastComponent} from './toast.component';
import {ReversePipe} from './reverse.pipe';
import {ToastService} from './toast.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ToastComponent, ReversePipe],
    providers: [ToastService],
    exports: [ToastComponent]
})
export class ToastModule {
}
