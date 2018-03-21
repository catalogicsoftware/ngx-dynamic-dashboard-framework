import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EndPointComponent} from './tab-endpoint/endpoint.component';
import {EndPointDetailComponent} from './tab-endpoint/endpointDetail.component';
import {EndPointService} from './tab-endpoint/endpoint.service';
import {BoardsComponent} from './tab-boards/boards-component';
import {DndModule} from 'ng2-dnd';
import {
    MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AIComponent} from './tab-artificial-intelligence/ai.component';

@NgModule({
    imports: [
        CommonModule,
        DndModule.forRoot(),
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        BoardsComponent,
        EndPointComponent,
        EndPointDetailComponent,
        AIComponent
    ],
    providers: [

        EndPointService
    ],
    exports: [
        BoardsComponent,
        EndPointComponent,
        EndPointDetailComponent
    ]
})
export class ConfigurationModule {
}
