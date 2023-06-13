import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeccionUsuariosHomeComponent } from './seccion-usuarios-home/seccion-usuarios-home.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { AltaAdminComponent } from './alta-admin/alta-admin.component';
import { AltaPacienteComponent } from './alta-paciente/alta-paciente.component';
import { AltaEspecialistaComponent } from './alta-especialista/alta-especialista.component';

const routes: Routes = [

  {path:'', component:SeccionUsuariosHomeComponent},
  {path:'alta-admin', component:AltaAdminComponent},
  {path:'alta-paciente', component:AltaPacienteComponent},
  {path:'alta-especialista', component:AltaEspecialistaComponent},
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeccionUsuariosRoutingModule { }
