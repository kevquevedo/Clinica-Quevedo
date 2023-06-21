import { Component, OnInit } from '@angular/core';
import { HistoriasService } from 'src/app/services/HistoriasService/historias.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  historias:any[]=[];
  historiasFiltradas : any[] = [];

  constructor(
    private hServ : HistoriasService
  ) { }

  ngOnInit(): void {
    this.hServ.obtenerHistorias().subscribe(historias=>{
      this.historias=[];
      this.historias = historias;
    })
  }
}
