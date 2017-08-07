import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {BoardComponent} from './components/board/board-manager/board.component';


export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children:

            [
                {
                    path: '',
                    redirectTo: 'main-board',
                    pathMatch: 'full'
                },
                {
                    path: 'main-board',
                    component: BoardComponent
                }
            ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {
}

