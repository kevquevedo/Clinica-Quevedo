import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { LogUsuariosService } from 'src/app/services/LogUsuarios/log-usuarios.service';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

export var informacion = []

@Component({
  selector: 'app-grafico-logs',
  templateUrl: './grafico-logs.component.html',
  styleUrls: ['./grafico-logs.component.css']
})
export class GraficoLogsComponent {
  informacion!: any[];
  view: any = [600, 400];
  info1 :any[] = [];
  info2 :any[] = [];
  logs :any[] = [];
  usuarios!: any[];
  usuariosUltCon!: any[];
  // options
  showLegend: boolean = true;
  showLabels: boolean = true;
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(
    private lServ : LogUsuariosService,
    private uServ : UsuarioService
  ) {
    Object.assign(this, { informacion });
    this.uServ.obtenerUsuarios().subscribe(respuesta =>{
      this.usuarios = [];
      this.usuarios = respuesta;
    })
    this.lServ.obtenerLogUsuarios().subscribe( respuesta =>{
      this.logs = [];
      this.logs = respuesta;
      this.info1 = [];
      respuesta.forEach( (log:any) =>{
        let rev = false;
        this.info1.forEach( info =>{
          if(info.name == log.email){
            rev = true;
            info.value++;
          }
        });
        if(!rev){
          let logGuardado = {"name":log.email, "value": 1}
          this.info1.push(logGuardado);
        }
      })
      this.info2 = this.info1;
      this.verUltCon(this.info2);
      this.verificarUsuario(this.info1)
      this.informacion = this.info1;
    })
  }

  verificarUsuario(informacionEmail:any){
    informacionEmail.forEach( (info:any) => {
      this.usuarios.forEach( (usuario:any) =>{
        if(usuario.email == info.name){
          info.name = usuario.nombre + ' ' + usuario.apellido;
        }
      })
    })
  }

  verUltCon(informacionEmail:any){
    this.usuariosUltCon =[]
    informacionEmail.forEach( (info:any) => {

      this.logs.forEach((log:any) =>{
        let rev = false;
        if(log.email == info.name){
          this.usuariosUltCon.forEach( (usu:any) => {
            if(usu.email == log.email){
              rev = true;
              if(usu.fecha < log.fecha){
                usu.fecha = log.fecha;
                usu.hora = log.hora;
              }else if(usu.fecha == log.fecha && usu.hora < log.hora){
                usu.fecha = log.fecha;
                usu.hora = log.hora;
              }
            }
          });
          if(!rev){
            this.usuariosUltCon.push(log);
          }
        }
      });
    })
  }

  descargarPDF(){
    let element = document.querySelector("#grafico4") as HTMLElement;
    html2canvas(element).then((canvas: any) => {
      let pdfFile = new jsPDF('l', 'px', "a4");
      let fecha = (new Date()).toLocaleString();
      pdfFile.text( "Fecha Emisión: " + fecha, 240, 20 );
      let imagen = new Image(); imagen.src = "../../../../assets/logo.png";
      pdfFile.addImage( imagen, 'PNG', 120, 40, 60, 60 ); pdfFile.text( "CLÍNICA QUEVEDO", 190, 80 );
      pdfFile.text( "LOGS DE USUARIOS", 120, 130);
      let imgData = canvas.toDataURL("image/jpeg", 2.5);
      pdfFile.addImage(imgData, 10, 150, 700, 300);
      pdfFile.save('Logs-De-Usuarios.pdf');
    });
  }
}
