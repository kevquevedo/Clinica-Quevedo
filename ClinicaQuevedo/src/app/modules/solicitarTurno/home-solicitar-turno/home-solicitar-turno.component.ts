import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { EspecialidadesService } from 'src/app/services/EspecialidadesService/especialidades.service';
import { TurnosService } from 'src/app/services/TurnosService/turnos.service';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-solicitar-turno',
  templateUrl: './home-solicitar-turno.component.html',
  styleUrls: ['./home-solicitar-turno.component.css']
})
export class HomeSolicitarTurnoComponent implements OnInit {

  especialidades: any[] = [];
  especialistas: any[] = [];
  especialistasFilter: any[] = [];
  auxEspecialidad: boolean = false;

  constructor(
    private uServ: UsuarioService,
    private servTurno: TurnosService,
    private espServ: EspecialidadesService
  ) { }

  ngOnInit(): void {
    this.espServ.obtenerEspecialidades().subscribe(respuesta => {
      this.especialidades = respuesta;
    })

    this.uServ.obtenerUsuarios().subscribe(respuesta => {
      respuesta.forEach(usuario => {
        if((usuario as any).rol == 'especialista'){
          this.especialistas.push(usuario);
        }
      })
    })
  }

  eligeEspecialidad(especialidad: any) {
    this.especialistasFilter = [];
    this.especialistas.forEach(especialista => {
      if(especialista.especialidad == especialidad.nombre){
        this.especialistasFilter.push(especialista);
      }
    })
    this.auxEspecialidad = true;
  }

  eligeEspecialista(especialista:any){
    console.log(especialista)
    let hora = [
      {
        "horario":8,
        "ocupado": true
      },
      {
        "horario":9,
        "ocupado":false
      }
    ]
    console.log(hora)
  }

  cargarTurno() { }


}
