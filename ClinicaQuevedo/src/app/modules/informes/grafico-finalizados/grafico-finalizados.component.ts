import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { TurnosService } from 'src/app/services/TurnosService/turnos.service';

export var informacion1 = []
export var informacion2 = []

@Component({
  selector: 'app-grafico-finalizados',
  templateUrl: './grafico-finalizados.component.html',
  styleUrls: ['./grafico-finalizados.component.css']
})
export class GraficoFinalizadosComponent {
  titulo : string = 'Meses';
  informacion1!: any[];
  informacion2!: any[];
  nombre1!: string;
  nombre2!: string;
  view1: any = [600, 300];
  view2: any = [600, 300];
  // INFO1
  showXAxis1: boolean = true;
  showYAxis1: boolean = true;
  gradient1: boolean = false;
  showLegend1: boolean = true;
  showXAxisLabel1: boolean = true;
  yAxisLabel1: string = 'Meses';
  showYAxisLabel1: boolean = true;
  xAxisLabel1: string = 'Cantidad';
  colorScheme1: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  // INFO2
  showXAxis2: boolean = true;
  showYAxis2: boolean = true;
  gradient2: boolean = false;
  showLegend2: boolean = true;
  showXAxisLabel2: boolean = true;
  yAxisLabel2: string = 'Meses';
  showYAxisLabel2: boolean = true;
  xAxisLabel2: string = 'Cantidad';
  colorScheme2: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(
    private tServ : TurnosService
  ) {
    Object.assign(this, { informacion1 });
    Object.assign(this, { informacion2 });

    this.tServ.obtenerTurnos().subscribe(respuesta => {
      this.informacion1 = [{"name": 'Junio', "value": 0}, {"name": 'Julio', "value": 0}];
      this.informacion2 = [{"name": 'Junio', "value": 0}, {"name": 'Julio', "value": 0}];
      respuesta.forEach((turno:any) => {
        if(turno.estado == 'realizado'){
          if(turno.especialista.email == 'givaka6508@devswp.com'){
            this.nombre1 = turno.especialista.nombre + ' ' + turno.especialista.apellido;
            if((turno.fecha as string).substring(3,5) == '06'){
              this.informacion1[0].value++;
            }
            if((turno.fecha as string).substring(3,5) == '07'){
              this.informacion1[1].value++;
            }
          }
          if(turno.especialista.email == 'pijebof307@onlcool.com'){
            this.nombre2 = turno.especialista.nombre + ' ' + turno.especialista.apellido;
            if((turno.fecha as string).substring(3,5) == '06'){
              this.informacion2[0].value++;
            }
            if((turno.fecha as string).substring(3,5) == '07'){
              this.informacion2[1].value++;
            }
          }
        }
      })
    })
  }

  descargarPDF(){
    let element = document.querySelector("#grafico3") as HTMLElement;
    html2canvas(element).then((canvas: any) => {
      let pdfFile = new jsPDF('l', 'px', "a4");
      let fecha = (new Date()).toLocaleString();
      pdfFile.text( "Fecha Emisión: " + fecha, 240, 20 );
      let imagen = new Image(); imagen.src = "../../../../assets/logo.png";
      pdfFile.addImage( imagen, 'PNG', 120, 40, 60, 60 ); pdfFile.text( "CLÍNICA QUEVEDO", 190, 80 );
      pdfFile.text( "TURNOS FINALIZADOS POR MEDICO", 120, 130);
      let imgData = canvas.toDataURL("image/jpeg", 2.5);
      pdfFile.addImage(imgData, 0, 150, 600, 200);
      pdfFile.save('Turnos-Finalizados-Por-Medico.pdf');
    });
  }
}
