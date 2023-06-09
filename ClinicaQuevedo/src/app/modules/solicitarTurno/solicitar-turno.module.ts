import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitarTurnoRoutingModule } from './solicitar-turno-routing.module';
import { HomeSolicitarTurnoComponent } from './home-solicitar-turno/home-solicitar-turno.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TablaEspecialistasComponent } from './tabla-especialistas/tabla-especialistas.component';
import { TablaEspecialidadesComponent } from './tabla-especialidades/tabla-especialidades.component';
import { TablaPacientesComponent } from './tabla-pacientes/tabla-pacientes.component';
import { NotImageDirective } from 'src/app/directives/NotImageDirective/not-image.directive';


@NgModule({
  declarations: [
    HomeSolicitarTurnoComponent,
    TablaEspecialistasComponent,
    TablaEspecialidadesComponent,
    TablaPacientesComponent,
    NotImageDirective,
  ],
  imports: [
    CommonModule,
    PipesModule,
    SolicitarTurnoRoutingModule
  ]
})
export class SolicitarTurnoModule { }
