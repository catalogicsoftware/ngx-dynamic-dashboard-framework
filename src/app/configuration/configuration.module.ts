import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EndPointComponent} from './tab-endpoint/endpoint.component';
import {EndPointDetailComponent} from './tab-endpoint/endpointDetail.component';
import {EndPointService} from './tab-endpoint/endpoint.service';
import {BoardConfigurationComponent} from './tab-configuration/board-configuration-component';
import {DndModule} from 'ng2-dnd';
import {MdButtonModule, MdCheckboxModule, MdIconModule, MdInputModule} from '@angular/material';
/*
@NgModule({
    imports: [
        CommonModule,
        DndModule.forRoot(),
        MdButtonModule,
        MdIconModule,
        MdCheckboxModule,
        MdInputModule,
    ],
    declarations: [
        BoardConfigurationComponent,
        EndPointComponent,
        EndPointDetailComponent
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
*/