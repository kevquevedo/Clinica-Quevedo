import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { TurnosService } from 'src/app/services/TurnosService/turnos.service';
export var informacion = []
@Component({
  selector: 'app-grafico-dia',
  templateUrl: './grafico-dia.component.html',
  styleUrls: ['./grafico-dia.component.css']
})
export class GraficoDiaComponent {
  informacion!: any[];
  view: any = [700, 400];
  dias :any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Fechas';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';
  titulo:string = 'Fechas';
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private tServ : TurnosService
  ) {
    Object.assign(this, { informacion });

    let diaAct = new Date();
    let diaFecha = formatDate(diaAct, 'dd/MM/yyyy', this.locale);
    let verDia: any;
    let diaFormateado: any;
    let diaNuevo: any;
    this.dias = [];

    this.tServ.obtenerTurnos().subscribe(respuesta => {
      respuesta.forEach((turno:any) => {
        let rev = false;
        this.dias.forEach( dia =>{
          if(dia.name == turno.fecha){
            rev = true;
            dia.value++;
          }
        });
        if(!rev){
          let diaFormateado = {"name":turno.fecha, "value": 1}
          this.dias.push(diaFormateado);
        }
      })
      this.dias.sort(this.ordenarPorFechaYHora);
      this.informacion = this.dias;
    })
  }

  ordenarPorFechaYHora(turno1: any, turno2: any) {
    let tur1 = (turno1.name as string).substring(6,10) + (turno1.name as string).substring(3,5) + (turno1.name as string).substring(0,2);
    let tur2 = (turno2.name as string).substring(6,10) + (turno2.name as string).substring(3,5) + (turno2.name as string).substring(0,2);
    if(tur1 < tur2){
      return -1;
    }else if(tur1 > tur2){
      return 1;
    }
    return 0;
  }

  descargarPDF(){
    let element = document.querySelector("#grafico6") as HTMLElement;
    html2canvas(element).then((canvas: any) => {
      let pdfFile = new jsPDF('l', 'px', "a4");
      let fecha = (new Date()).toLocaleString();
      pdfFile.text( "Fecha Emisión: " + fecha, 240, 20 );
      let imagen = new Image(); imagen.src = "../../../../assets/logo.png";
      pdfFile.addImage( imagen, 'PNG', 120, 40, 60, 60 ); pdfFile.text( "CLÍNICA QUEVEDO", 190, 80 );
      pdfFile.text( "TURNOS POR DIA", 120, 130);
      let imgData = canvas.toDataURL("image/jpeg", 2.5);
      pdfFile.addImage(imgData, 0, 150, 600, 250);
      pdfFile.save('Turnos-Por-Dia.pdf');
    });
  }
}
