import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HistoriasService } from 'src/app/services/HistoriasService/historias.service';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seccion-pacientes-home',
  templateUrl: './seccion-pacientes-home.component.html',
  styleUrls: ['./seccion-pacientes-home.component.css']
})
export class SeccionPacientesHomeComponent implements OnInit {

  historias:any[]=[];
  historiasPac:any[]=[];
  historiasFiltradas : any[] = [];
  pacientes:any[]=[];
  pacientesFiltrados:any[]=[];
  usuarioLog!:any;

  constructor(
    private hServ : HistoriasService,
    private uServ : UsuarioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let auth = getAuth();
    this.usuarioLog = auth.currentUser?.email;
    if(this.usuarioLog == undefined){
      this.router.navigateByUrl('');
    }

    this.hServ.obtenerHistorias().subscribe(respuesta =>{
      this.historias = [];
      this.pacientes = [];
      respuesta.forEach(historia=>{
        if(this.usuarioLog == (historia as any).turno.especialista.email){
          this.historias.push(historia);
          this.pacientes.push((historia as any).turno.paciente)
        }
      })

      this.pacientesFiltrados = [];
      this.pacientes.reduce((array,item)=>{
        if(!array.includes(item.email)){
          array.push(item.email);
          this.pacientesFiltrados.push(item);
        }
        return array;
      },[])

    })

  }

  eligePaciente(paciente: any) {
    this.historiasPac = [];
    this.historias.forEach(historia=>{
      if(historia.turno.paciente.email == paciente.email){
        this.historiasPac.push(historia);
      }
    })
  }

  verResenia(turno:any){
    Swal.fire({
      title: '<strong>Comentario del Turno</strong>',
      icon: 'info',
      html: turno.comentario,
      showCloseButton: true,
      focusConfirm: false,
    })
  }

}
