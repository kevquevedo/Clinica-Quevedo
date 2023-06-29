import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import jsPDF from 'jspdf';
import { HistoriasService } from 'src/app/services/HistoriasService/historias.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  historias:any[]=[];
  historiasFiltradas : any[] = [];
  nombre!:any;
  apellido!:any;
  especialistas:any[]=[];
  especialistasFiltrados:any[]=[];

  constructor(
    private hServ : HistoriasService
  ) { }

  ngOnInit(): void {

    let auth = getAuth();
    let usuarioLog = auth.currentUser?.email;
    this.hServ.obtenerHistorias().subscribe(respuesta =>{
      this.historias = [];
      respuesta.forEach(historia=>{
        if(usuarioLog == (historia as any).turno.paciente.email){
          this.especialistas.push((historia as any).turno.especialista)
          this.historias.push(historia);
          this.nombre = (historia as any).turno.paciente.nombre;
          this.apellido = (historia as any).turno.paciente.apellido;
        }
      })

      this.especialistasFiltrados = [];
      this.especialistas.reduce((array,item)=>{
        if(!array.includes(item.email)){
          array.push(item.email);
          this.especialistasFiltrados.push(item);
        }
        return array;
      },[])
    });


  }

  crearTurnoPDF(historia:any){
    let doc = new jsPDF( 'portrait', 'px', 'a4' );
    let fecha = (new Date()).toLocaleString();
    doc.text( "Fecha Emisión: " + fecha, 240, 20 );
    let imagen = new Image(); imagen.src = "../../../../assets/logo.png";
    doc.addImage( imagen, 'PNG', 120, 40, 60, 60 ); doc.text( "CLÍNICA QUEVEDO", 190, 80 );
    doc.text( "DATOS TURNO: " + this.apellido + ', ' + this.nombre, 120, 140);

    let posicion = 160;
    doc.text("Especialidad: " + new TitleCasePipe().transform(historia.turno.especialidad), 35, posicion+=15);
    doc.text("Fecha: " + historia.turno.fecha, 35, posicion+=15);
    doc.text("Altura: " + historia.altura +" mts", 35, posicion+=15);
    doc.text("Peso: " + historia.peso + " Kg", 35, posicion+=15);
    doc.text("Presion: " + historia.presion, 35, posicion+=15);
    doc.text("Temperatura: " + historia.temperatura+"°C", 35, posicion+=15);
    if(historia.clave1 != '' || historia.clave2 != '' || historia.clave3 != ''){
      doc.text("Datos Adicionales: ", 35, posicion+=15);
    }
    if (historia.clave1 != '') {
      doc.text(historia.clave1 + ': ' + historia.valor1, 100, posicion+=15);
    }
    if (historia.clave2 != '') {
      doc.text(historia.clave2 + ': ' + historia.valor2, 100, posicion+=15);
    }
    if (historia.clave3 != '') {
      doc.text(historia.clave3 + ': ' + historia.valor3, 100, posicion+=15);
    }
    let nombrePDF = historia.turno.paciente.apellido + '-' + historia.turno.especialidad + '-' + historia.turno.fecha;
    doc.save( nombrePDF );
  }

  crearHistoriaPDF(historias:any){
    let doc = new jsPDF( 'portrait', 'px', 'a4' );
    let fecha = (new Date()).toLocaleString();
    doc.text( "Fecha Emisión: " + fecha, 240, 20 );
    let imagen = new Image(); imagen.src = "../../../../assets/logo.png";
    doc.addImage( imagen, 'PNG', 120, 40, 60, 60 ); doc.text( "CLÍNICA QUEVEDO", 190, 80 );
    doc.text( "HISTORIA CLINICA: " + this.apellido + ', ' + this.nombre, 120, 140);

    let posicion = 160;

    historias.forEach((historia: {
      valor3: string;
      valor2: string;
      valor1: string; turno: { especialidad: string; fecha: string; }; altura: string; peso: string; presion: string; temperatura: string; clave1: string | string[]; clave2: string | string[]; clave3: string | string[];
}) =>{
      doc.text("Especialidad: " + new TitleCasePipe().transform(historia.turno.especialidad), 35, posicion+=15);
      doc.text("Fecha: " + historia.turno.fecha, 35, posicion+=15);
      doc.text("Altura: " + historia.altura +" mts", 35, posicion+=15);
      doc.text("Peso: " + historia.peso + " Kg", 35, posicion+=15);
      doc.text("Presion: " + historia.presion, 35, posicion+=15);
      doc.text("Temperatura: " + historia.temperatura+"°C", 35, posicion+=15);
      if(historia.clave1 != '' || historia.clave2 != '' || historia.clave3 != ''){
        doc.text("Datos Adicionales: ", 35, posicion+=15);
      }
      if (historia.clave1 != '') {
        doc.text(historia.clave1 + ': ' + historia.valor1, 100, posicion+=15);
      }
      if (historia.clave2 != '') {
        doc.text(historia.clave2 + ': ' + historia.valor2, 100, posicion+=15);
      }
      if (historia.clave3 != '') {
        doc.text(historia.clave3 + ': ' + historia.valor3, 100, posicion+=15);
      }
      doc.text("----------------------------------------------------------------", 35, posicion+=15);
    })

    let nombrePDF = this.apellido + '-historia-clinica';
    doc.save( nombrePDF );
  }

  eligeEspecialista(esp : any){
    this.crearPDFPorEspecialista(esp);
  }

  crearPDFPorEspecialista(esp:any){
    let historiasFilt: any [] = [];
    this.historias.forEach(historia =>{
      if(historia.turno.especialista.email == esp.email){
        historiasFilt.push(historia);
      }
    })

    let doc = new jsPDF( 'portrait', 'px', 'a4' );
    let fecha = (new Date()).toLocaleString();
    doc.text( "Fecha Emisión: " + fecha, 240, 20 );
    let imagen = new Image(); imagen.src = "../../../../assets/logo.png";
    doc.addImage( imagen, 'PNG', 120, 40, 60, 60 ); doc.text( "CLÍNICA QUEVEDO", 190, 80 );
    doc.text( "TURNOS: " + this.apellido + ', ' + this.nombre, 120, 140);
    doc.text( "ESPECIALISTA: " + esp.apellido + ', ' + esp.nombre, 120, 155);

    let posicion = 170;

    historiasFilt.forEach((historia: {
      valor3: string;
      valor2: string;
      valor1: string; turno: { especialidad: string; fecha: string; }; altura: string; peso: string; presion: string; temperatura: string; clave1: string | string[]; clave2: string | string[]; clave3: string | string[];
}) =>{
      doc.text("Especialidad: " + new TitleCasePipe().transform(historia.turno.especialidad), 35, posicion+=15);
      doc.text("Fecha: " + historia.turno.fecha, 35, posicion+=15);
      doc.text("Altura: " + historia.altura +" mts", 35, posicion+=15);
      doc.text("Peso: " + historia.peso + " Kg", 35, posicion+=15);
      doc.text("Presion: " + historia.presion, 35, posicion+=15);
      doc.text("Temperatura: " + historia.temperatura+"°C", 35, posicion+=15);
      if(historia.clave1 != '' || historia.clave2 != '' || historia.clave3 != ''){
        doc.text("Datos Adicionales: ", 35, posicion+=15);
      }
      if (historia.clave1 != '') {
        doc.text(historia.clave1 + ': ' + historia.valor1, 100, posicion+=15);
      }
      if (historia.clave2 != '') {
        doc.text(historia.clave2 + ': ' + historia.valor2, 100, posicion+=15);
      }
      if (historia.clave3 != '') {
        doc.text(historia.clave3 + ': ' + historia.valor3, 100, posicion+=15);
      }
      doc.text("----------------------------------------------------------------", 35, posicion+=15);
    })

    let nombrePDF = this.apellido + '-Turnos-' + esp.nombre + '-' + esp.apellido;
    doc.save( nombrePDF );
  }



}
