import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {

  lista! : any;
  @Output() public especialistaSeleccionado : EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private uServ : UsuarioService
  ) { }

  ngOnInit(): void {
    this.uServ.obtenerUsuarios().subscribe(respuesta =>{
      this.lista = respuesta;
    })
  }

  personaElegida(esp : any){
    this.especialistaSeleccionado.emit( esp );
  }

}
