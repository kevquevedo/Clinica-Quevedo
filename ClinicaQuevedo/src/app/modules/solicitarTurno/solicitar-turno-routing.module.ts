import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { HomeSolicitarTurnoComponent } from './home-solicitar-turno/home-solicitar-turno.component';

const routes: Routes = [
  {path:'', component:HomeSolicitarTurnoComponent},
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitarTurnoRoutingModule { }
