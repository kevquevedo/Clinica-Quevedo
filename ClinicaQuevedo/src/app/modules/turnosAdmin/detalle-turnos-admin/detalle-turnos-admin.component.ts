import { Component, Input, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/services/TurnosService/turnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-turnos-admin',
  templateUrl: './detalle-turnos-admin.component.html',
  styleUrls: ['./detalle-turnos-admin.component.css']
})
export class DetalleTurnosAdminComponent implements OnInit {

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

}
