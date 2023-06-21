import { DatePipe, TitleCasePipe, formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { HorapipePipe } from 'src/app/pipes/horaPipe/horapipe.pipe';
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

  emailLogueado!:any;
  usuarioRegistrado!:any;

  especialistaElegido!:any;
  especialidadElegida!:any;
  fechaElegida!:any;
  horaElegida!:any;
  pacienteElegido!:any;

  auxEspecialidad: boolean = false;
  auxDia: boolean = false;
  auxHora: boolean = false;
  auxPaciente: boolean = false;

  especialidades: any[] = [];
  especialidadesFiltrada: any[] = [];
  dias :any[] = [];
  horas :any[] = [];
  turnos :any[] = [];
  turnosEspecialista :any[] = [];

  constructor(
    private router: Router,
    private turnoServ: TurnosService,
    private usuarioServ: UsuarioService,
    @Inject(LOCALE_ID) public locale: string,
  ) { }

  ngOnInit(): void {
    this.cargarDias();
    let auth = getAuth();
    this.emailLogueado = auth.currentUser?.email;
    if(this.emailLogueado == undefined){
      this.router.navigateByUrl('');
    }
    this.usuarioServ.obtenerUsuarios().subscribe( usuarios =>{
      usuarios.forEach(usuario=>{
        if((usuario as any).email == this.emailLogueado){
          this.usuarioRegistrado = usuario;
        }
      })
    })
    this.turnoServ.obtenerTurnos().subscribe( turnos =>{
      this.turnos = turnos;
    })
  }

  verificarTurnosEspecialista(especialistaEmail:any, especialidad:any){
    this.turnosEspecialista = [];
    this.turnos.forEach(turno =>{
      if(turno.especialista.email == especialistaEmail && turno.especialidad == especialidad.nombre){
        this.turnosEspecialista.push(turno);
      }
    })
  }

  cargarDias(){
    let diaAct = new Date();
    let diaFecha = formatDate(diaAct, 'dd/MM/yyyy', this.locale);
    let diaNuevo: any;
    let verDomingo: any;
    let diaFormateado: any;
    for (let indice = 0; indice < 15; indice++) {
      verDomingo = formatDate(diaAct, 'EEEE', this.locale);
      if(verDomingo != "Sunday"){
        diaFormateado = {"dia":verDomingo, "fecha":diaFecha}
        this.dias.push(diaFormateado);
      }
      diaNuevo = diaAct.setDate(diaAct.getDate() + 1);
      diaFecha = formatDate(diaNuevo, 'dd/MM/yyyy', this.locale);
    }
  }

  cargarHoras(){
    this.horas = [];
    //SETEO DE HORA INICIAL (08AM)
    let horaAct = new Date();
    horaAct.setHours(Number.parseInt('8'))
    horaAct.setMinutes(Number.parseInt('0'))
    //SETEO DE HORA FINAL
    let horaFinal = new Date();
    if(this.fechaElegida.dia == 'Saturday'){
      //(14PM)Sabados
      horaFinal.setHours(Number.parseInt('14'))
    }else{
      //(19PM)Lunes a Viernes
      horaFinal.setHours(Number.parseInt('19'))
    }
    //RUTINA PARA OBTENER HORAS
    let horaFecha = formatDate(horaAct, 'hh:mm a', this.locale);
    let horaNuevo: any;
    for ( horaAct.getHours() ; horaAct.getHours() < horaFinal.getHours(); horaAct.getHours()+ this.especialistaElegido.duracionTurno) {
      let horaObject={ "valor":horaFecha, "ocupado":false}
      this.horas.push(horaObject);
      horaNuevo = horaAct.setMinutes(horaAct.getMinutes() + this.especialistaElegido.duracionTurno);
      horaFecha = formatDate(horaNuevo, 'hh:mm a', this.locale);
    }
  }

  tomarEspecialista(especialista: any){
    this.especialistaElegido = especialista;
    this.auxEspecialidad = true;
    this.auxDia = false;
    this.auxHora = false;
  }

  tomarPaciente(paciente: any){
    this.pacienteElegido = paciente;
    this.cargarTurnoAdmin();
  }

  tomarEspecialidad(especialidad: any){
    this.verificarTurnosEspecialista(this.especialistaElegido.email, especialidad);
    this.especialidadElegida = especialidad;
    this.auxDia = true;
  }

  elegirDia(dia:any){
    this.fechaElegida = dia;
    this.cargarHoras();
    this.turnosEspecialista.forEach(turno => {
      if(turno.fecha == dia.fecha){
        this.horas.forEach(hora =>{
          if(hora.valor == turno.hora){
            hora.ocupado = true;
          }
        })
      }
    })
    this.auxHora = true;
  }

  elegirHora(hora:any){
    this.horaElegida = hora;
    if(this.usuarioRegistrado.rol == 'admin'){
      this.auxPaciente = true;
    }else{
      this.cargarTurno();
    }
  }

  cargarTurno() {
    Swal.fire({
      title: 'Desea guardar el turno?',
      html:
        'Especialista: ' + this.especialistaElegido.nombre + ' ' + this.especialistaElegido.apellido + '<br>' +
        'Especialidad: ' + new TitleCasePipe().transform(this.especialidadElegida.nombre) + '<br>' +
        'Fecha: ' + this.fechaElegida.fecha + '<br>' +
        'Hora: ' + this.horaElegida.valor,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Salir'
    }).then((result) => {
      if (result.isConfirmed) {
        this.turnoServ.crearTurno(
          this.especialistaElegido,
          this.especialidadElegida,
          this.fechaElegida.fecha,
          this.horaElegida.valor,
          this.usuarioRegistrado
        )
        Swal.fire('Se guardó el turno con éxito.', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se guardó el turno!', '', 'info')
      }
      this.auxEspecialidad = false;
      this.auxDia = false;
      this.auxHora = false;
    })
  }

  cargarTurnoAdmin() {
    Swal.fire({
      title: 'Desea guardar el turno?',
      html:
        'Especialista: ' + this.especialistaElegido.nombre + ' ' + this.especialistaElegido.apellido + '<br>' +
        'Paciente: ' + this.pacienteElegido.nombre + ' ' + this.pacienteElegido.apellido + '<br>' +
        'Especialidad: ' + new TitleCasePipe().transform(this.especialidadElegida.nombre) + '<br>' +
        'Fecha: ' + this.fechaElegida.fecha + '<br>' +
        'Hora: ' + this.horaElegida.valor,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Salir'
    }).then((result) => {
      if (result.isConfirmed) {
        this.turnoServ.crearTurno(
          this.especialistaElegido,
          this.especialidadElegida,
          this.fechaElegida.fecha,
          this.horaElegida.valor,
          this.pacienteElegido
        )
        Swal.fire('Se guardó el turno con éxito.', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se guardó el turno!', '', 'info')
      }
      this.auxPaciente = false;
      this.auxEspecialidad = false;
      this.auxDia = false;
      this.auxHora = false;
    })
  }


}
