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
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { PipesModule } from "../../pipes/pipes.module";


@NgModule({
    declarations: [
        SeccionUsuariosHomeComponent,
        TablaUsuariosComponent,
        DetalleUsuarioComponent,
        AltaAdminComponent,
        AltaPacienteComponent,
        AltaEspecialistaComponent,
        HistoriaClinicaComponent,
    ],
    imports: [
        CommonModule,
        SeccionUsuariosRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule
    ]
})
export class SeccionUsuariosModule { }
