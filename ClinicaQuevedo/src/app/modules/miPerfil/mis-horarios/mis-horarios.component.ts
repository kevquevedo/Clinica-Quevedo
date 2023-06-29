import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DisponibilidadService } from 'src/app/services/DisponibilidadService/disponibilidad.service';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

declare var window:any;

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.css']
})
export class MisHorariosComponent implements OnInit {

  usuarioLog!:any;
  auxHorario:boolean=false;
  auxDias:boolean=false;
  auxDisposicion:boolean=false;
  usuarioRegistrado!:any;
  diasLaborales:any = []
  idDisp!:any;
  mensajeError: string | undefined;
  diaElegido!:any;

  constructor(
    private uServ: UsuarioService,
    private dServ: DisponibilidadService
  ) { }

  ngOnInit(): void {
    let auth = getAuth();
    this.usuarioLog = auth.currentUser?.email;
    this.uServ.obtenerUsuarios().subscribe(usuarios=>{
      usuarios.forEach(usuario => {
        if((usuario as any).email == this.usuarioLog){
          this.usuarioRegistrado = usuario;
        }
      })
    })

    this.dServ.obtenerDisponibilidades().subscribe(disponibilidades=>{
      this.diasLaborales = [];
      disponibilidades.forEach(disp =>{
        if((disp as any).email  == this.usuarioLog){
          this.cargarDiasLaborales(disp)
        }
      })
    });
  }

  cargarDiasLaborales(disponibilidad:any){
    this.idDisp = disponibilidad.id;
    this.diasLaborales.push((disponibilidad as any).lunes)
    this.diasLaborales.push((disponibilidad as any).martes)
    this.diasLaborales.push((disponibilidad as any).miercoles)
    this.diasLaborales.push((disponibilidad as any).jueves)
    this.diasLaborales.push((disponibilidad as any).viernes)
    this.diasLaborales.push((disponibilidad as any).sabado)
  }

  cambiarHorario(){
    if(this.auxHorario){
      this.auxHorario=false
    }else{
      this.auxHorario=true;
    }
  }

  cambiarDias(){
    if(this.auxDias){
      this.auxDias=false
    }else{
      this.auxDias=true;
    }
  }

  cambiarDisposicion(){
    if(this.auxDisposicion){
      this.auxDisposicion=false
    }else{
      this.auxDisposicion=true;
    }
  }

  elegirDuracion(duracion:any){
    this.uServ.actualizarDuracionEspecialista(this.usuarioRegistrado, duracion);
    this.actualizarUsuario();
  }

  actualizarUsuario(){
    this.uServ.obtenerUsuarios().subscribe( respuesta => {
      respuesta.forEach( usuario => {
        if((usuario as any).id == this.usuarioRegistrado.id){
          this.usuarioRegistrado = usuario;
        }
      })
    })
  }

  habilitarDia(dia:any){
    this.dServ.actualizarEstadoDia(dia, this.idDisp, true);
  }

  deshabilitarDia(dia:any){
    this.dServ.actualizarEstadoDia(dia, this.idDisp, false);
  }

  irAHorarios(dia:any){
    this.diaElegido = dia;
  }

  actualizarHorarios(dia: any){
    if(this.validarHorarios()){
      let horaDesde = this.evaluarHora((<HTMLInputElement>document.getElementById("hora-desde")).value);
      let horaHasta = this.evaluarHora((<HTMLInputElement>document.getElementById("hora-hasta")).value);
      this.dServ.actualizarHora(dia, this.idDisp, horaDesde, horaHasta);
      let modal = document.getElementById('modalHorarios');
      const modalBootstrap = window.bootstrap.Modal.getOrCreateInstance(modal);
      modalBootstrap.hide();
    }
  }

  evaluarHora(numero:any) : string{
    switch(numero){
      case '1':
        return '08:00 AM';
        break;
      case '2':
        return '09:00 AM';
        break;
      case '3':
        return '10:00 AM';
        break;
      case '4':
        return '11:00 AM';
        break;
      case '5':
        return '12:00 PM';
        break;
      case '6':
        return '01:00 PM';
        break;
      case '7':
        return '02:00 PM';
        break;
      case '8':
        return '03:00 PM';
        break;
      case '9':
        return '04:00 PM';
        break;
      case '10':
        return '05:00 PM';
        break;
      case '11':
        return '06:00 PM';
        break;
      case '12':
        return '07:00 PM';
        break;
    }
    return '';
  }

  validarHorarios() : boolean{
    let desde = (<HTMLInputElement>document.getElementById("hora-desde")).value;
    let hasta = (<HTMLInputElement>document.getElementById("hora-hasta")).value;
    if(desde > hasta){
      this.mensajeError = "La 'hora desde', debe ser menor que la 'hora hasta'.";
      return false;
      this.ocultarMensaje();
    }
    if(desde == hasta){
      this.mensajeError = "La 'hora desde' y 'hora hasta' no pueden ser iguales.";
      return false;
      this.ocultarMensaje();
    }
    return true;
  }

  ocultarMensaje(){
    setTimeout(() =>{ this.mensajeError = undefined },3000)
  }
}
