import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seccion-usuarios-home',
  templateUrl: './seccion-usuarios-home.component.html',
  styleUrls: ['./seccion-usuarios-home.component.css']
})
export class SeccionUsuariosHomeComponent implements OnInit {

  usuarioRecibido! : any;

  constructor() { }

  ngOnInit(): void {
  }

  tomarEspecialista(especialista : any){
    this.usuarioRecibido = especialista;
  }

}
