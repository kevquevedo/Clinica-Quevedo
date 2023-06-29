import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading! : boolean;

  constructor( ) {
    this.loading = true;
  }

  ngOnInit(): void {
    setTimeout(() =>{ this.loading= false; }, 1000)
  }

}
