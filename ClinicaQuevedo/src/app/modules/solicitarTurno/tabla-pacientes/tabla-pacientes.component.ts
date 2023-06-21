import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.css']
})
export class TablaPacientesComponent implements OnInit {

  @Output() public pacSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  pacientes: any[] = [];

  constructor(
    private uServ: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.uServ.obtenerUsuarios().subscribe(respuesta => {
      this.pacientes = [];
      respuesta.forEach(usuario => {
        if((usuario as any).rol == 'paciente'){
          this.pacientes.push(usuario);
        }
      })
    })
  }

  eligePaciente(paciente: any) {
    this.pacSeleccionado.emit(paciente);
  }

}
