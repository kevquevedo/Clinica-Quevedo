import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { TurnosService } from 'src/app/services/TurnosService/turnos.service';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

@Component({
  selector: 'app-listado-turnos-especialistas',
  templateUrl: './listado-turnos-especialistas.component.html',
  styleUrls: ['./listado-turnos-especialistas.component.css']
})
export class ListadoTurnosEspecialistasComponent implements OnInit {

  @Output() public turnoSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  listadoTurnosUsuario : any[] = [];
  listadoFiltrado : any[] = [];

  constructor(
    private uServ : UsuarioService,
    private tServ : TurnosService
  ) { }

  ngOnInit(): void {
    let auth = getAuth();
    this.tServ.obtenerTurnos().subscribe(respuesta =>{
      this.listadoTurnosUsuario = [];
      respuesta.forEach( (turno:any) => {
        if(turno.especialistaEmail == auth.currentUser!.email){
          this.listadoTurnosUsuario.push(turno);
        }
      });
    })
  }

  eligeTurno(turno: any) {
    this.turnoSeleccionado.emit(turno);
  }

}
