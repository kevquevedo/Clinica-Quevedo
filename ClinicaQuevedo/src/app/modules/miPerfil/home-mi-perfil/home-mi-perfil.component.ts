import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

@Component({
  selector: 'app-home-mi-perfil',
  templateUrl: './home-mi-perfil.component.html',
  styleUrls: ['./home-mi-perfil.component.css']
})
export class HomeMiPerfilComponent implements OnInit {

  usuarioLog! : any;
  usuarioDatos! : any;

  constructor(
    private uServ : UsuarioService
  ) {
    let auth = getAuth();
    this.usuarioLog = auth.currentUser?.email;
  }

  ngOnInit(): void {
    this.uServ.obtenerUsuarios().subscribe( respuesta => {
      respuesta.forEach( usuario =>{
        if( (usuario as any).email == this.usuarioLog){
          this.usuarioDatos = usuario;
        }
      })
    })
  }

}
