import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seccion-usuarios-home',
  templateUrl: './seccion-usuarios-home.component.html',
  styleUrls: ['./seccion-usuarios-home.component.css']
})
export class SeccionUsuariosHomeComponent implements OnInit {

  usuarioRecibido! : any;
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

  tomarEspecialista(especialista : any){
    this.usuarioRecibido = especialista;
  }

}
