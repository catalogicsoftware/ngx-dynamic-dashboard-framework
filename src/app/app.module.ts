import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {RoutingModule} from './routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BoardModule} from './board/board.module';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        RoutingModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BoardModule

    ],
    declarations: [
        AppComponent,
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
