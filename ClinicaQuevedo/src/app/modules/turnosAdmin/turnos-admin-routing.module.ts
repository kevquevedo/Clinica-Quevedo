import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { HomeTurnosAdminComponent } from './home-turnos-admin/home-turnos-admin.component';

const routes: Routes = [
  {path:'', component:HomeTurnosAdminComponent},
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosAdminRoutingModule { }
