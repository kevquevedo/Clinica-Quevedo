import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.css']
})
export class MisHorariosComponent implements OnInit {

  usuarioLog!:any;
  auxHorario:boolean=false;
  usuarioRegistrado!:any;

  constructor(
    private uServ: UsuarioService
  ) { }

  ngOnInit(): void {
    let auth = getAuth();
    this.usuarioLog = auth.currentUser?.email;
    this.uServ.obtenerUsuarios().subscribe(usuarios=>{
      usuarios.forEach(usuario => {
        if((usuario as any).email == this.usuarioLog){
          this.usuarioRegistrado = usuario;
        }
      })
    })
  }

  cambiarHorario(){
    if(this.auxHorario){
      this.auxHorario=false
    }else{
      this.auxHorario=true;
    }
  }

  elegirDuracion(duracion:any){
    this.uServ.actualizarDuracionEspecialista(this.usuarioRegistrado, duracion);
    this.actualizarUsuario();
  }

  actualizarUsuario(){
    this.uServ.obtenerUsuarios().subscribe( respuesta => {
      respuesta.forEach( usuario => {
        if((usuario as any).id == this.usuarioRegistrado.id){
          this.usuarioRegistrado = usuario;
        }
      })
    })
  }
}
