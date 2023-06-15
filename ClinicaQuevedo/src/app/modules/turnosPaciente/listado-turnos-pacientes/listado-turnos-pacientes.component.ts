import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { TurnosService } from 'src/app/services/TurnosService/turnos.service';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

@Component({
  selector: 'app-listado-turnos-pacientes',
  templateUrl: './listado-turnos-pacientes.component.html',
  styleUrls: ['./listado-turnos-pacientes.component.css']
})
export class ListadoTurnosPacientesComponent implements OnInit {

  @Output() public turnoSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  listadoTurnosUsuario : any[] = [];
  listadoFiltrado : any[] = [];

  constructor(
    private uServ : UsuarioService,
    private tServ : TurnosService
  ) { }

  ngOnInit() : void{
    let auth = getAuth();
    this.tServ.obtenerTurnos().subscribe(respuesta =>{
      this.listadoTurnosUsuario = [];
      respuesta.forEach( (turno:any) => {
        if(turno.pacienteEmail == auth.currentUser!.email){
          this.listadoTurnosUsuario.push(turno);
        }
      });
    })
  }

  eligeTurno(turno: any) {
    this.turnoSeleccionado.emit(turno);
  }
}
