import { animateChild, group, query, style, transition, trigger, animate, state } from '@angular/animations';
import { DatePipe, TitleCasePipe, formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DisponibilidadService } from 'src/app/services/DisponibilidadService/disponibilidad.service';
import { EspecialidadesService } from 'src/app/services/EspecialidadesService/especialidades.service';
import { TurnosService } from 'src/app/services/TurnosService/turnos.service';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-solicitar-turno',
  templateUrl: './home-solicitar-turno.component.html',
  styleUrls: ['./home-solicitar-turno.component.css'],
  animations: [
    trigger('moverIzqDer', [
      state('void', style({
        transform: 'translateX(-100%)',
        opacity:0
      })),
      transition(':enter', [
        animate(800, style({
          transform: 'translateX(0)',
          opacity:1
        }))
      ]),
    ]),
    trigger('moverDerIzq', [
      state('void', style({
        transform: 'translateX(+100%)',
        opacity:0
      })),
      transition(':enter' , [
        animate(800, style({
          transform: 'translateX(0)',
          opacity:1
        }))
      ]),
    ]),
  ]
})
export class HomeSolicitarTurnoComponent implements OnInit {
  isOpen! :any;
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
  disponibilidadesEsp :any[] = [];

  constructor(
    private router: Router,
    private turnoServ: TurnosService,
    private usuarioServ: UsuarioService,
    private dispoServ: DisponibilidadService,
    @Inject(LOCALE_ID) public locale: string,
  ) { }

  ngOnInit(): void {

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
    let verDia: any;
    let diaFormateado: any;
    this.dias = [];
    this.cargarDiasLaboralesEspecialista()
    .then( ()=> {
      for (let indice = 0; indice < 15; indice++) {
        verDia = this.verDias(formatDate(diaAct, 'EEEE', this.locale));
        if(verDia != "domingo" && this.verificarDiaLaboralEspecialista(verDia)){
          diaFormateado = {"dia":verDia, "fecha":diaFecha}
          this.dias.push(diaFormateado);
        }
        diaNuevo = diaAct.setDate(diaAct.getDate() + 1);
        diaFecha = formatDate(diaNuevo, 'dd/MM/yyyy', this.locale);
      }
    });
  }

  verDias(diaIngles:string) : string{
    switch(diaIngles){
      case 'Monday':
        return 'lunes'
        break;
      case 'Tuesday':
        return 'martes'
        break;
      case 'Wednesday':
        return 'miercoles'
        break;
      case 'Thursday':
        return 'jueves'
        break;
      case 'Friday':
        return 'viernes'
        break;
      case 'Saturday':
        return 'sabado'
        break;
      case 'Sunday':
        return 'domingo'
        break;
    }
    return '';
  }

  cargarDiasLaboralesEspecialista() : Promise<any>{
    return new Promise( (exito)=>{
      this.dispoServ.obtenerDisponibilidades().subscribe(disponibilidades => {
        this.disponibilidadesEsp = [];
        disponibilidades.forEach((disp: any) => {
          if (disp.email == this.especialistaElegido.email && disp.especialidad == this.especialidadElegida.nombre) {
            this.disponibilidadesEsp.push((disp as any).lunes);
            this.disponibilidadesEsp.push((disp as any).martes);
            this.disponibilidadesEsp.push((disp as any).miercoles);
            this.disponibilidadesEsp.push((disp as any).jueves);
            this.disponibilidadesEsp.push((disp as any).viernes);
            this.disponibilidadesEsp.push((disp as any).sabado);
            exito("OK")
          }
        });
      });
    })
  }

  verificarDiaLaboralEspecialista(dia:any):boolean{
    let retorno = false;
    this.disponibilidadesEsp.forEach( (diaDisp:any) =>{
      if( (diaDisp.dia == dia) && diaDisp.laborable) {
        retorno = true;
      }
    });
    return retorno;
  }

  cargarHoras(){
    this.horas = [];

    let dispEsp = this.cargarHorasLaboralesEspecialista(this.fechaElegida.dia)
    //SETEO DE HORA INICIAL
    let horaAct = new Date();
    horaAct.setHours(Number.parseInt(this.calcularHora(dispEsp.horaDesde))) //VER
    horaAct.setMinutes(Number.parseInt('0'))
    //SETEO DE HORA FINAL
    let horaFinal = new Date();
    horaFinal.setHours(Number.parseInt(this.calcularHora(dispEsp.horaHasta))) //VER

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

  calcularHora(hora:string) : string{
    let horaStr = hora.substring(0,2);
    let franja = hora.substring(6,8)
    if(franja == 'PM'){
      switch(horaStr){
        case '12':
          horaStr = '12';
          break;
        case '01':
          horaStr = '13';
          break;
        case '02':
          horaStr = '14';
          break;
        case '03':
          horaStr = '15';
          break;
        case '04':
          horaStr = '16';
          break;
        case '05':
          horaStr = '17';
          break;
        case '06':
          horaStr = '18';
          break;
        case '07':
          horaStr = '19';
          break;
      }
    }
    return horaStr;
  }

  cargarHorasLaboralesEspecialista(dia:any) : any{
    let retorno = undefined;
    this.disponibilidadesEsp.forEach((disp: any) => {
      if(disp.dia == dia){
        retorno = disp;
      }
    });
    return retorno;
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
    this.cargarDias();
    this.auxDia = true;
  }

  elegirDia(dia:any){
    setTimeout(()=>{this.auxHora = true;},500)
    this.fechaElegida = dia;
    this.cargarHoras();
    this.turnosEspecialista.forEach(turno => {
      if(turno.fecha == dia.fecha){
        this.horas.forEach(hora =>{
          if(hora.valor == turno.hora && turno.estado != 'rechazado' && turno.estado != 'cancelado'){
            hora.ocupado = true;
          }
        })
      }
    })
    this.auxHora = false
    // this.auxHora = true;
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
