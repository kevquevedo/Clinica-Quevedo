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
        if(turno.paciente.email == auth.currentUser!.email){
          this.listadoTurnosUsuario.push(turno);
        }
      });
      this.listadoTurnosUsuario.sort(this.ordenarPorFechaYHora)
    })
  }

  eligeTurno(turno: any) {
    this.turnoSeleccionado.emit(turno);
  }

  ordenarPorFechaYHora(turno1: any, turno2: any) {
    let tur1 = (turno1.fecha as string).substring(6,10) + (turno1.fecha as string).substring(3,5) + (turno1.fecha as string).substring(0,2);
    let tur2 = (turno2.fecha as string).substring(6,10) + (turno2.fecha as string).substring(3,5) + (turno2.fecha as string).substring(0,2);
    if(tur1 < tur2){
      return 1;
    }else if(tur1 > tur2){
      return -1;
    }
    return 0;
  }
}
