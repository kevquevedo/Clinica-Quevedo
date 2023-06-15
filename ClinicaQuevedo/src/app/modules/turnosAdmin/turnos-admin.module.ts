import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosAdminRoutingModule } from './turnos-admin-routing.module';
import { HomeTurnosAdminComponent } from './home-turnos-admin/home-turnos-admin.component';
import { ListadoTurnosAdminComponent } from './listado-turnos-admin/listado-turnos-admin.component';
import { DetalleTurnosAdminComponent } from './detalle-turnos-admin/detalle-turnos-admin.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    HomeTurnosAdminComponent,
    ListadoTurnosAdminComponent,
    DetalleTurnosAdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    TurnosAdminRoutingModule
  ]
})
export class TurnosAdminModule { }
