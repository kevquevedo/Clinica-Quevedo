import { Component, OnInit, ViewChild } from '@angular/core';
import { Color, LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { TurnosService } from 'src/app/services/TurnosService/turnos.service';

export var informacion = []

@Component({
  selector: 'app-grafico-especialidad',
  templateUrl: './grafico-especialidad.component.html',
  styleUrls: ['./grafico-especialidad.component.css']
})

export class GraficoEspecialidadComponent{

  single!: any[];
  view: any = [700, 400];

  // options
  titulo:string = 'Especialidades';
  letras:number = 13;
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Right;
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C'],
  };

  informacion: any[] = [];
  contOdo!: any;
  contPsico!: any;

  constructor(
    private tServ : TurnosService
  ) {
    Object.assign(this, { informacion });
    this.tServ.obtenerTurnos().subscribe( (respuesta:any)  => {
      this.contOdo = 0;
      this.contPsico = 0;
      this.informacion = [];

      respuesta.forEach( (turno:any) => {
        if(turno.especialidad == 'odontologia'){
          this.contOdo++;
        }
        if(turno.especialidad == 'psicologia'){
          this.contPsico++;
        }
      });
      let objOdo = {"name": 'Odontologia', "value" : this.contOdo};
      let objPsi = {"name": 'Psicologia', "value" : this.contPsico};
      this.informacion.push(objOdo);
      this.informacion.push(objPsi);
    })
  }

  descargarPDF(){
    let element = document.querySelector("#grafico5") as HTMLElement;
    html2canvas(element).then((canvas: any) => {
      let pdfFile = new jsPDF('l', 'px', "a4");
      let fecha = (new Date()).toLocaleString();
      pdfFile.text( "Fecha Emisión: " + fecha, 240, 20 );
      let imagen = new Image(); imagen.src = "../../../../assets/logo.png";
      pdfFile.addImage( imagen, 'PNG', 120, 40, 60, 60 ); pdfFile.text( "CLÍNICA QUEVEDO", 190, 80 );
      pdfFile.text( "TURNOS POR ESPECIALIDAD", 120, 130);
      let imgData = canvas.toDataURL("image/jpeg", 2.5);
      pdfFile.addImage(imgData, 0, 150, 650, 200);
      pdfFile.save('Turnos-Por-Especialidad.pdf');
    });
  }

}
