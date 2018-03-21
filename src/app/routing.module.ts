import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {BoardComponent} from './board/board.component';
import {GadgetDetailComponent} from './gadget-detail/gadget-detail.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'main-board',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'main-board',
        component: BoardComponent
    },
    {
        path: 'detail',
        component: GadgetDetailComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {
}

