import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  usuario: string | undefined;
  rol: string | undefined;
  subsUsuario!: Subscription;

  constructor(
    private uServ : UsuarioService
  ){
    this.usuario = this.uServ.usuarioRegistrado;
    this.rol = this.uServ.rol;
  }

  ngOnInit(): void {
    this.subsUsuario = this.uServ.emailLogueado$.subscribe( () => {
      this.usuario = this.uServ.usuarioRegistrado;
      this.rol = this.uServ.rol;
    })
  }

  ngOnDestroy(): void{
    this.subsUsuario.unsubscribe();
  }

  cerrarSesion(){
    this.uServ.logOut();
  }

}
