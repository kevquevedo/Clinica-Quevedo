import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EspecialidadesService } from 'src/app/services/EspecialidadesService/especialidades.service';

@Component({
  selector: 'app-tabla-especialidades',
  templateUrl: './tabla-especialidades.component.html',
  styleUrls: ['./tabla-especialidades.component.css']
})
export class TablaEspecialidadesComponent implements OnInit, OnChanges {

  @Input() especialistaRecibido : any | undefined;
  @Output() public especialidadSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  especialidades: any[] = [];
  especialidadesFiltrada: any[] = [];

  constructor(
    private espServ: EspecialidadesService,
  ) { }

  ngOnInit(): void {
    this.espServ.obtenerEspecialidades().subscribe(respuesta => {
      this.especialidades = respuesta;
      this.actualizarEspecialista(this.especialistaRecibido);
    })
  }

  ngOnChanges(cambios:SimpleChanges){
    if(!cambios['especialistaRecibido'].firstChange){
      this.actualizarEspecialista(cambios['especialistaRecibido'].currentValue);
    }
  }

  actualizarEspecialista(especialista:any){
    this.especialidadesFiltrada = [];
    this.especialidades.forEach(especialidad => {
      if(especialidad.nombre == especialista.especialidad){
        console.log(especialidad)
        this.especialidadesFiltrada.push(especialidad)
      }
    })
  }

  eligeEspecialidad(especialidad: any) {
    this.especialidadSeleccionado.emit(especialidad);
  }
}
