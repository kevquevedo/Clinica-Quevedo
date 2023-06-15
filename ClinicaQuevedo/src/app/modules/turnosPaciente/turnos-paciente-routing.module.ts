import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { HomeTurnosPacientesComponent } from './home-turnos-pacientes/home-turnos-pacientes.component';

const routes: Routes = [
  {path:'', component:HomeTurnosPacientesComponent},
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosPacienteRoutingModule { }
