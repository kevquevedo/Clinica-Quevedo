import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  {path:'home', component: HomeComponent,
    children:
    [
      {path: '', component: BienvenidaComponent},
      {path:'nosotros', component: NosotrosComponent},
      {path:'seccion-usuarios', loadChildren: () => import('./modules/seccionUsuarios/seccion-usuarios.module').then((m) => m.SeccionUsuariosModule)},
    ]
  },
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent},
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
