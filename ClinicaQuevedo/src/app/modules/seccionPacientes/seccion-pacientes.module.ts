import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeccionPacientesRoutingModule } from './seccion-pacientes-routing.module';
import { SeccionPacientesHomeComponent } from './seccion-pacientes-home/seccion-pacientes-home.component';
import { PipesModule } from "../../pipes/pipes.module";
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        SeccionPacientesHomeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SeccionPacientesRoutingModule,
        PipesModule
    ]
})
export class SeccionPacientesModule { }
