import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {RoutingModule} from './routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BoardModule} from './board/board.module';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {GadgetDetailModule} from './gadget-detail/gadget-detail.module';
import {MenuModule} from './menu/menu.module';



@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RoutingModule,
        FormsModule,
        HttpClientModule,
        MenuModule,
        BoardModule,
        GadgetDetailModule,
        HttpClientJsonpModule
    ],
    declarations: [
        AppComponent,
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
