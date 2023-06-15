import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-turnos-especialistas',
  templateUrl: './home-turnos-especialistas.component.html',
  styleUrls: ['./home-turnos-especialistas.component.css']
})
export class HomeTurnosEspecialistasComponent implements OnInit {

  turnoRecibido !: any;

  constructor() { }

  ngOnInit(): void { }

  tomarTurno(turnoRecibido : any){
    this.turnoRecibido = turnoRecibido
  }

}
