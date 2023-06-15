import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { HomeTurnosEspecialistasComponent } from './home-turnos-especialistas/home-turnos-especialistas.component';

const routes: Routes = [
  {path:'', component:HomeTurnosEspecialistasComponent},
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosEspecialistaRoutingModule { }
