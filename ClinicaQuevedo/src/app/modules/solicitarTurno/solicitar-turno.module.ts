import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitarTurnoRoutingModule } from './solicitar-turno-routing.module';
import { HomeSolicitarTurnoComponent } from './home-solicitar-turno/home-solicitar-turno.component';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    HomeSolicitarTurnoComponent,

  ],
  imports: [
    CommonModule,
    PipesModule,
    SolicitarTurnoRoutingModule
  ]
})
export class SolicitarTurnoModule { }
