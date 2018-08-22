import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EndpointConfigurationTabComponent} from './tab-endpoint/endpoint-configuration-tab.component';
import {EndPointDetailComponent} from './tab-endpoint/endpointDetail.component';
import {EndPointService} from './tab-endpoint/endpoint.service';
import {BoardsConfigurationTabComponent} from './tab-boards/boards-configuration-tab.component';
import {DndModule} from 'ng2-dnd';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatChipsModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AIConfigurationTabComponent} from './tab-artificial-intelligence/ai-configuration-tab.component';
import {OptionsConfigurationTabComponent} from "./tab-options/options-configuration-tab.component";
import {ConfigurationComponent} from "./configuration-component";
import {OptionsService} from "./tab-options/service";

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
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatChipsModule
    ],
    declarations: [
        BoardsConfigurationTabComponent,
        EndpointConfigurationTabComponent,
        EndPointDetailComponent,
        AIConfigurationTabComponent,
        OptionsConfigurationTabComponent,
        ConfigurationComponent
    ],
    providers: [

        EndPointService,
        OptionsService
    ],
    exports: [
        BoardsConfigurationTabComponent,
        EndpointConfigurationTabComponent,
        EndPointDetailComponent,
        OptionsConfigurationTabComponent,
        ConfigurationComponent
    ]
})
export class ConfigurationModule {
}
