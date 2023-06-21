import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { SeccionPacientesHomeComponent } from './seccion-pacientes-home/seccion-pacientes-home.component';

const routes: Routes = [
  {path:'', component:SeccionPacientesHomeComponent},
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeccionPacientesRoutingModule { }
