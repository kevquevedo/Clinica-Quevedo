import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { TurnosService } from 'src/app/services/TurnosService/turnos.service';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import Swal from 'sweetalert2';
import * as XLSX from "xlsx"

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {

  lista! : any[];
  turnos! : any[];
  @Output() public especialistaSeleccionado : EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private uServ : UsuarioService,
    private tServ : TurnosService
  ) { }

  ngOnInit(): void {
    this.uServ.obtenerUsuarios().subscribe(respuesta =>{
      this.lista = [];
      respuesta.forEach( (usuario:any) => {
        if(usuario.rol != 'admin'){
          this.lista.push(usuario);
        }
      })
    })

    this.tServ.obtenerTurnos().subscribe(respuesta =>{
      this.turnos = [];
      this.turnos = respuesta;
    })
  }

  personaElegida(esp : any){
    this.especialistaSeleccionado.emit( esp );
  }

  crearExcelPacientes(lista:any){
    let pacientes : any [] = [];
    lista.forEach((usuario:any) => {
      if(usuario.rol == 'paciente'){
        let usuarioExcel = {
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          dni: usuario.dni,
          edad: usuario.edad,
          email: usuario.email,
          obraSocial: usuario.obrasocial,
          imagenPerfil: usuario.imgs.url1,
          rol: usuario.rol
        }
        pacientes.push(usuarioExcel);
      }
    });
    let ws = XLSX.utils.json_to_sheet(pacientes);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pacientes");
    XLSX.writeFile(wb, "Pacientes.xlsx");
  }

  crearExcelEspecialistas(lista:any){
    let especialistas : any [] = [];
    lista.forEach((usuario:any) => {
      if(usuario.rol == 'especialista'){
        let usuarioExcel = {
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          dni: usuario.dni,
          edad: usuario.edad,
          email: usuario.email,
          especialidad: usuario.especialidad,
          imagenPerfil: usuario.img,
          rol: usuario.rol
        }
        especialistas.push(usuarioExcel);
      }
    });
    let ws = XLSX.utils.json_to_sheet(especialistas);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Especialistas");
    XLSX.writeFile(wb, "Especialistas.xlsx");
  }

  verDatosTurnos(usuario:any){
    if(usuario.rol == 'paciente'){
      this.descargarTurnosPaciente(usuario);
    }
    if(usuario.rol == 'especialista'){
      this.descargarTurnosEspecialista(usuario);
    }
  }

  descargarTurnosPaciente(usuario:any){
    let turnosPac: any[] = []
    this.turnos.forEach( (turno:any) =>{
      if(turno.paciente.email == usuario.email){
        turnosPac.push(turno);
      }
    })
    this.infoTurnosExcel(turnosPac, usuario);
  }

  descargarTurnosEspecialista(usuario:any){
    let turnosEsp: any[] = []
    this.turnos.forEach( (turno:any) =>{
      if(turno.especialista.email == usuario.email){
        turnosEsp.push(turno);
      }
    })
    this.infoTurnosExcel(turnosEsp, usuario);
  }

  infoTurnosExcel(turnos:any, usuario:any){

    if(turnos.length == 0){
      Swal.fire('El usuario elegido no posee turnos asignados.')
    }else{
      let turnosFilt : any [] = [];
      turnos.forEach((turno:any) => {
        let infoTurnoExcel = {
          Fecha: turno.fecha,
          Hora: turno.hora,
          Estado: turno.estado,
          EmailPaciente: turno.paciente.email,
          Especialidad: turno.especialidad,
          Especialista: turno.especialista.nombre + ' ' + turno.especialista.apellido,
          EmailEspecialista: turno.especialista.email
        }
        turnosFilt.push(infoTurnoExcel);
      });

      let ws = XLSX.utils.json_to_sheet(turnosFilt);
      let wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Turnos - " + usuario.nombre + '-' + usuario.apellido);
      XLSX.writeFile(wb, usuario.nombre + '-' + usuario.apellido + "-Turnos.xlsx");
    }
  }


}
