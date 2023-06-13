import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeccionUsuariosRoutingModule } from './seccion-usuarios-routing.module';
import { SeccionUsuariosHomeComponent } from './seccion-usuarios-home/seccion-usuarios-home.component';
import { TablaUsuariosComponent } from './tabla-usuarios/tabla-usuarios.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { AltaAdminComponent } from './alta-admin/alta-admin.component';
import { AltaPacienteComponent } from './alta-paciente/alta-paciente.component';
import { AltaEspecialistaComponent } from './alta-especialista/alta-especialista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SeccionUsuariosHomeComponent,
    TablaUsuariosComponent,
    DetalleUsuarioComponent,
    AltaAdminComponent,
    AltaPacienteComponent,
    AltaEspecialistaComponent,
  ],
  imports: [
    CommonModule,
    SeccionUsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SeccionUsuariosModule { }
