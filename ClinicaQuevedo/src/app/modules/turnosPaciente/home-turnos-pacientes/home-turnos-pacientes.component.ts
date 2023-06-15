import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-turnos-pacientes',
  templateUrl: './home-turnos-pacientes.component.html',
  styleUrls: ['./home-turnos-pacientes.component.css']
})
export class HomeTurnosPacientesComponent implements OnInit {

  turnoRecibido !: any;

  constructor() { }

  ngOnInit(): void {
  }

  tomarTurno(turnoRecibido : any){
    this.turnoRecibido = turnoRecibido
  }
}
