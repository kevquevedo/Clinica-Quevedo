import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { HomeMiPerfilComponent } from './home-mi-perfil/home-mi-perfil.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MisHorariosComponent } from './mis-horarios/mis-horarios.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeMiPerfilComponent,
    MisHorariosComponent,
    HistoriaClinicaComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    MiPerfilRoutingModule
  ]
})
export class MiPerfilModule { }
