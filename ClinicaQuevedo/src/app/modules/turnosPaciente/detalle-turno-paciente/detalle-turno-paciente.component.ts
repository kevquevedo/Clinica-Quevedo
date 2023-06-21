import { Component, Input, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { TurnosService } from 'src/app/services/TurnosService/turnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-turno-paciente',
  templateUrl: './detalle-turno-paciente.component.html',
  styleUrls: ['./detalle-turno-paciente.component.css']
})
export class DetalleTurnoPacienteComponent implements OnInit{

  @Input() turnoElegido : any | undefined;

  constructor(
    private tServ : TurnosService
  ) { }

  ngOnInit(): void { }

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
    }).then((resultado) => {
      if (resultado.isConfirmed && resultado.value! != "") {
        this.tServ.actualizarEstadoTurno(turno, 'cancelado');
        this.tServ.actualizarComentarioTurno(turno, resultado.value);
        this.actualizarTurno(turno);
        Swal.fire({
          title: `Se canceló el turno con éxito`,
        })
      }
      if (resultado.isConfirmed && resultado.value! == "") {
        Swal.fire({
          title: `No se procesó la cancelación del turno. Debe ingresar un motivo.`,
        })
      }
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

  completarEncuesta(turno : any){
    this.tServ.actualizarEncuestaTurno(turno, true);
    this.actualizarTurno(turno);
  }

  calificarAtencion(turno : any){
    Swal.fire({
      title: 'Por favor, deje un comentario sobre la atención brindada:',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((resultado) => {
      console.log(resultado)
      if (resultado.isConfirmed && resultado.value! != "") {
        this.tServ.actualizarAtencionTurno(turno, resultado.value);
        this.tServ.actualizarComentarioTurno(turno, resultado.value);
        this.actualizarTurno(turno);
        Swal.fire({
          title: `Se grabó con éxito su comentario.`,
        })
      }
      if (resultado.isConfirmed && resultado.value! == "") {
        Swal.fire({
          title: `Debe ingresar un comentario.`,
        })
      }
    })
  }

  actualizarTurno(turno : any){
    this.tServ.obtenerTurnos().subscribe( respuesta => {
      respuesta.forEach( pacienteT => {
        if((pacienteT as any).id == this.turnoElegido.id){
          this.turnoElegido = pacienteT;
        }
      })
    })
  }




}
