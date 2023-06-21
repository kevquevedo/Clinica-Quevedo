import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosEspecialistaRoutingModule } from './turnos-especialista-routing.module';
import { HomeTurnosEspecialistasComponent } from './home-turnos-especialistas/home-turnos-especialistas.component';
import { ListadoTurnosEspecialistasComponent } from './listado-turnos-especialistas/listado-turnos-especialistas.component';
import { DetalleTurnosEspecialistasComponent } from './detalle-turnos-especialistas/detalle-turnos-especialistas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    HomeTurnosEspecialistasComponent,
    ListadoTurnosEspecialistasComponent,
    DetalleTurnosEspecialistasComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    TurnosEspecialistaRoutingModule
  ]
})
export class TurnosEspecialistaModule { }
