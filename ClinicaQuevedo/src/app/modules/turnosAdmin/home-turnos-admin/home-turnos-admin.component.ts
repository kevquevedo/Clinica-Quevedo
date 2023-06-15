import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-turnos-admin',
  templateUrl: './home-turnos-admin.component.html',
  styleUrls: ['./home-turnos-admin.component.css']
})
export class HomeTurnosAdminComponent implements OnInit {

  turnoRecibido !: any;

  constructor() { }

  ngOnInit(): void { }

  tomarTurno(turnoRecibido : any){
    this.turnoRecibido = turnoRecibido
  }

}
