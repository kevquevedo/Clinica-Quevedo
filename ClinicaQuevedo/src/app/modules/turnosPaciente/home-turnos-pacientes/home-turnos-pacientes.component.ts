import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-turnos-pacientes',
  templateUrl: './home-turnos-pacientes.component.html',
  styleUrls: ['./home-turnos-pacientes.component.css']
})
export class HomeTurnosPacientesComponent implements OnInit {

  turnoRecibido !: any;
  emailLogueado!:any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    let auth = getAuth();
    this.emailLogueado = auth.currentUser?.email;
    if(this.emailLogueado == undefined){
      this.router.navigateByUrl('');
    }
  }

  tomarTurno(turnoRecibido : any){
    this.turnoRecibido = turnoRecibido
  }
}
