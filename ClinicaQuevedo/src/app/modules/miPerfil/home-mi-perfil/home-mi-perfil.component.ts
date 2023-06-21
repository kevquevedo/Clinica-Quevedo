import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
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
    private uServ : UsuarioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let auth = getAuth();
    this.usuarioLog = auth.currentUser?.email;
    if(this.usuarioLog == undefined){
      this.router.navigateByUrl('');
    }
    this.uServ.obtenerUsuarios().subscribe( respuesta => {
      respuesta.forEach( usuario =>{
        if( (usuario as any).email == this.usuarioLog){
          this.usuarioDatos = usuario;
        }
      })
    })
  }

}
