import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-turnos-admin',
  templateUrl: './home-turnos-admin.component.html',
  styleUrls: ['./home-turnos-admin.component.css']
})
export class HomeTurnosAdminComponent implements OnInit {

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
