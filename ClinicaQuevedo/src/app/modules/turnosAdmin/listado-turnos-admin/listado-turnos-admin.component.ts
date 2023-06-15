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
    })
  }

  eligeTurno(turno: any) {
    this.turnoSeleccionado.emit(turno);
  }

}
