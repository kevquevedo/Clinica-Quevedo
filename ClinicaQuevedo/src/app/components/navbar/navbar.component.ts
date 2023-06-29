import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  fotoPerfil! : any;
  nombre! : any;

  constructor(
    private uServ : UsuarioService,
    private router : Router
  ){
    this.usuario = this.uServ.usuarioRegistrado;
    this.verificarImagen(this.uServ.usuarioRegistrado);
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
    this.router.navigateByUrl('')
  }

  verificarImagen(email : any){
    if(this.uServ.listUsuarios != undefined){
      this.uServ.listUsuarios.forEach( (usuario: any) => {
        if((usuario as any).email == email){
          if(usuario.rol == 'especialista' || usuario.rol == 'admin'){
            this.fotoPerfil = usuario.img;
          }else{
            this.fotoPerfil = usuario.imgs.url1;
          }
          this.nombre = usuario.nombre + ' ' + usuario.apellido;
        }
      });
    }
  }

}
