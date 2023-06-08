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
  subsUsuario!: Subscription;

  constructor(
    private uServ : UsuarioService
  ){
    this.usuario = this.uServ.usuarioRegistrado;
  }

  ngOnInit(): void {
    this.subsUsuario = this.uServ.emailLogueado$.subscribe( () => {
      this.usuario = this.uServ.usuarioRegistrado;
    })
  }

  ngOnDestroy(): void{
    this.subsUsuario.unsubscribe();
  }

  cerrarSesion(){
    this.uServ.logOut();
  }

}
