import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { HomeMiPerfilComponent } from './home-mi-perfil/home-mi-perfil.component';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    HomeMiPerfilComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    MiPerfilRoutingModule
  ]
})
export class MiPerfilModule { }
