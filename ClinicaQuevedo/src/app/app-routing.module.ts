import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';

const routes: Routes = [
  {path:'home', component: HomeComponent,
    children:
    [
      {path: '', component: BienvenidaComponent},
      {path:'nosotros', component: NosotrosComponent},
    ]
  },
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }