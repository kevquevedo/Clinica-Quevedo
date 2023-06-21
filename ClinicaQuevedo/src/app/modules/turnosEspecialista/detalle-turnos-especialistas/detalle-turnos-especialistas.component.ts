import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HistoriasService } from 'src/app/services/HistoriasService/historias.service';
import { TurnosService } from 'src/app/services/TurnosService/turnos.service';
import Swal from 'sweetalert2';

declare var window:any;

@Component({
  selector: 'app-detalle-turnos-especialistas',
  templateUrl: './detalle-turnos-especialistas.component.html',
  styleUrls: ['./detalle-turnos-especialistas.component.css']
})
export class DetalleTurnosEspecialistasComponent implements OnInit {

  @Input() turnoElegido : any | undefined;
  seleccionoDiagnostico!:boolean;
  diagnosticoForm!: FormGroup;
  mensajeError: string | undefined;

  constructor(
    private tServ : TurnosService,
    private hServ : HistoriasService
  ) { }

  ngOnInit(): void {
    this.seleccionoDiagnostico = false;
    this.diagnosticoForm = new FormGroup({
      altura: new FormControl('', [Validators.required]),
      peso: new FormControl('', [Validators.required]),
      presion: new FormControl('', [Validators.required]),
      temperatura: new FormControl('', [Validators.required]),
      comentario: new FormControl('', [Validators.required]),
      clave1: new FormControl(''),
      clave2: new FormControl(''),
      clave3: new FormControl(''),
      valor1: new FormControl(''),
      valor2: new FormControl(''),
      valor3: new FormControl(''),
    });
  }
  get altura(){
    return this.diagnosticoForm.get('altura');
  }
  get peso(){
    return this.diagnosticoForm.get('peso');
  }
  get presion(){
    return this.diagnosticoForm.get('presion');
  }
  get temperatura(){
    return this.diagnosticoForm.get('temperatura');
  }
  get comentario(){
    return this.diagnosticoForm.get('comentario');
  }
  get clave1(){
    return this.diagnosticoForm.get('clave1');
  }
  get clave2(){
    return this.diagnosticoForm.get('clave2');
  }
  get clave3(){
    return this.diagnosticoForm.get('clave3');
  }
  get valor1(){
    return this.diagnosticoForm.get('valor1');
  }
  get valor2(){
    return this.diagnosticoForm.get('valor2');
  }
  get valor3(){
    return this.diagnosticoForm.get('valor3');
  }

  cancelarTurno(turno : any){
    Swal.fire({
      title: 'Por qué cancela el turno?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((respuesta) => {
      if (respuesta.isConfirmed && respuesta.value! != "") {
        this.tServ.actualizarEstadoTurno(turno, 'cancelado');
        this.tServ.actualizarReseniaTurno(turno, respuesta.value);
        this.actualizarTurno(turno);
        Swal.fire({
          title: `Se canceló el turno con éxito`,
        })
      }
      if (respuesta.isConfirmed && respuesta.value! == "") {
        Swal.fire({
          title: `No se procesó la cancelación del turno. Debe ingresar un comentario.`,
        })
      }
    })
  }

  rechazarTurno(turno : any){
    Swal.fire({
      title: 'Por qué rechaza el turno?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((respuesta) => {
      if (respuesta.isConfirmed && respuesta.value! != "") {
        this.tServ.actualizarEstadoTurno(turno, 'rechazado');
        this.tServ.actualizarReseniaTurno(turno, respuesta.value);
        this.actualizarTurno(turno);
        Swal.fire({
          title: `Se rechazó el turno con éxito`,
        })
      }
      if (respuesta.isConfirmed && respuesta.value! == "") {
        Swal.fire({
          title: `No se procesó el rechazo del turno. Debe ingresar un comentario.`,
        })
      }
    })
  }

  aceptarTurno(turno : any){
    this.tServ.actualizarEstadoTurno(turno, 'aceptado');
    this.actualizarTurno(turno);
  }

  irADiagnostico(turno:any){
    this.seleccionoDiagnostico = true;
  }

  finalizarTurno(turno : any){
    if(this.evaluarErrorInputs()){
      let modal = document.getElementById('staticBackdrop');
      const modalBootstrap = window.bootstrap.Modal.getOrCreateInstance(modal);
      modalBootstrap.hide();
      this.hServ.crearHistoria(
        turno, this.altura?.value, this.peso?.value, this.temperatura?.value, this.presion?.value,
        this.comentario?.value, this.clave1?.value, this.clave2?.value, this.clave3?.value,
        this.valor1?.value, this.valor2?.value, this.valor3?.value
      );
      this.tServ.actualizarEstadoTurno(turno, 'realizado');
      this.tServ.actualizarReseniaTurno(turno, this.comentario?.value);
      this.actualizarTurno(turno);
      Swal.fire({
        title: `Se determinó como "realizado" el turno.`,
      })
    }
  }

  actualizarTurno(turno : any){
    this.tServ.obtenerTurnos().subscribe( respuesta => {
      respuesta.forEach( especialistaT => {
        if((especialistaT as any).id == this.turnoElegido.id){
          this.turnoElegido = especialistaT;
        }
      })
    })
  }

  verResenaComentario(turno : any){

    if(turno.estado == 'cancelado' && turno.comentarioPac != ''){
      Swal.fire({
        title: '<strong>Comentario Paciente</strong>',
        icon: 'info',
        html: turno.comentarioPac,
        showCloseButton: true,
        focusConfirm: false,
      })
    }

    if(turno.estado == 'cancelado' && turno.resenia != ''){
      Swal.fire({
        title: '<strong>Reseña Especialista</strong>',
        icon: 'info',
        html: turno.resenia,
        showCloseButton: true,
        focusConfirm: false,
      })
    }

    if(turno.estado == 'realizado' || turno.estado == 'rechazado'){
      Swal.fire({
        title: '<strong>Reseña Especialista</strong>',
        icon: 'info',
        html: turno.resenia,
        showCloseButton: true,
        focusConfirm: false,
      })
    }

  }

  evaluarErrorInputs(){
    if(!this.altura?.valid){
      this.mensajeError = "El campo 'Altura' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.peso?.valid){
      this.mensajeError = "El campo 'Peso' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.presion?.valid){
      this.mensajeError = "El campo 'Presion' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.temperatura?.valid){
      this.mensajeError = "El campo 'Temperatura' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(this.comentario?.value == ''){
      this.mensajeError = "El campo 'Comentario' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.evaluarClavesValores()){
      this.mensajeError = "Por favor, verifique los datos opcionales. Faltó una descripción o valor."
      this.ocultarMensaje();
      return false;
    }

    return true;
  }

  evaluarClavesValores(){
    if(this.clave1?.value == '' && this.valor1?.value != ''){
      return false
    }
    if(this.clave1?.value != '' && this.valor1?.value == ''){
      return false
    }
    if(this.clave2?.value == '' && this.valor2?.value != ''){
      return false
    }
    if(this.clave2?.value != '' && this.valor2?.value == ''){
      return false
    }
    if(this.clave3?.value == '' && this.valor3?.value != ''){
      return false
    }
    if(this.clave3?.value != '' && this.valor3?.value == ''){
      return false
    }
    return true
  }

  ocultarMensaje(){
    setTimeout(() =>{ this.mensajeError = undefined },3000)
  }

}
