import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TurnosService } from 'src/app/services/TurnosService/turnos.service';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

@Component({
  selector: 'app-listado-turnos-admin',
  templateUrl: './listado-turnos-admin.component.html',
  styleUrls: ['./listado-turnos-admin.component.css']
})
export class ListadoTurnosAdminComponent implements OnInit {

  @Output() public turnoSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  listadoTurnos : any[] = [];
  listadoFiltrado : any[] = [];

  constructor(
    private uServ : UsuarioService,
    private tServ : TurnosService
  ) { }

  ngOnInit(): void {
    this.tServ.obtenerTurnos().subscribe(respuesta =>{
      this.listadoTurnos = [];
      respuesta.forEach( (turno:any) => {
        this.listadoTurnos.push(turno);
      });
      this.listadoTurnos.sort(this.ordenarPorFechaYHora)
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
