import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EndPointComponent} from './tab-endpoint/endpoint.component';
import {EndPointDetailComponent} from './tab-endpoint/endpointDetail.component';
import {EndPointService} from './tab-endpoint/endpoint.service';
import {BoardConfigurationComponent} from './tab-configuration/board-configuration-component';
import {DndModule} from 'ng2-dnd';
import {
    MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AIConfigComponent} from './tab-artificial-intelligence/ai-config.component';

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
        BoardConfigurationComponent,
        EndPointComponent,
        EndPointDetailComponent,
        AIConfigComponent
    ],
    providers: [

        EndPointService
    ],
    exports: [
        BoardConfigurationComponent,
        EndPointComponent,
        EndPointDetailComponent
    ]
})
export class ConfigurationModule {
}
