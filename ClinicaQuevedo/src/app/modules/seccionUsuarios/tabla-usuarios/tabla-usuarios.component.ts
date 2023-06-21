import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import * as XLSX from "xlsx"

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {

  lista! : any;
  @Output() public especialistaSeleccionado : EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private uServ : UsuarioService
  ) { }

  ngOnInit(): void {
    this.uServ.obtenerUsuarios().subscribe(respuesta =>{
      this.lista = respuesta;
    })
  }

  personaElegida(esp : any){
    this.especialistaSeleccionado.emit( esp );
  }

  crearExcelPacientes(lista:any){
    let pacientes : any [] = [];
    lista.forEach((usuario:any) => {
      if(usuario.rol == 'paciente'){
        pacientes.push(usuario);
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
        especialistas.push(usuario);
      }
    });
    let ws = XLSX.utils.json_to_sheet(especialistas);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Especialistas");
    XLSX.writeFile(wb, "Especialistas.xlsx");
  }


}
