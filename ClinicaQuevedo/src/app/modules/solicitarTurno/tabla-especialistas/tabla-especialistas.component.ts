import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

@Component({
  selector: 'app-tabla-especialistas',
  templateUrl: './tabla-especialistas.component.html',
  styleUrls: ['./tabla-especialistas.component.css']
})
export class TablaEspecialistasComponent implements OnInit {

  @Output() public espSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  especialistas: any[] = [];

  constructor(
    private uServ: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.uServ.obtenerUsuarios().subscribe(respuesta => {
      this.especialistas = [];
      respuesta.forEach(usuario => {
        if((usuario as any).rol == 'especialista'){
          this.especialistas.push(usuario);
        }
      })
    })
  }

  eligeEspecialista(especialista: any) {
    this.espSeleccionado.emit(especialista);
  }

}
