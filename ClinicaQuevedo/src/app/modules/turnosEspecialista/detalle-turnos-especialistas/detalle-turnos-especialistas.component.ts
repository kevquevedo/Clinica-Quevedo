import { Component, Input, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/services/TurnosService/turnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-turnos-especialistas',
  templateUrl: './detalle-turnos-especialistas.component.html',
  styleUrls: ['./detalle-turnos-especialistas.component.css']
})
export class DetalleTurnosEspecialistasComponent implements OnInit {

  @Input() turnoElegido : any | undefined;

  constructor(
    private tServ : TurnosService
  ) { }

  ngOnInit(): void {}

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
  }

  finalizarTurno(turno : any){
    Swal.fire({
      title: 'Realice comentarios sobre el turno:',
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
        this.tServ.actualizarEstadoTurno(turno, 'realizado');
        Swal.fire({
          title: `Se determinó como "realizado" el turno.`,
        })
      }
      if (respuesta.isConfirmed && respuesta.value! == "") {
        Swal.fire({
          title: `No se pudo determinar como "realizado" el turno. Debe ingresar un comentario.`,
        })
      }
    })
  }

}
