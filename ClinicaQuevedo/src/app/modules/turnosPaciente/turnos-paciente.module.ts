import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosPacienteRoutingModule } from './turnos-paciente-routing.module';
import { HomeTurnosPacientesComponent } from './home-turnos-pacientes/home-turnos-pacientes.component';
import { ListadoTurnosPacientesComponent } from './listado-turnos-pacientes/listado-turnos-pacientes.component';
import { FormsModule } from '@angular/forms';
import { DetalleTurnoPacienteComponent } from './detalle-turno-paciente/detalle-turno-paciente.component';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    HomeTurnosPacientesComponent,
    ListadoTurnosPacientesComponent,
    DetalleTurnoPacienteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    TurnosPacienteRoutingModule
  ]
})
export class TurnosPacienteModule { }
