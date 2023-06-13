import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit{

  @Input() usuarioElegido : any | undefined;

  constructor(
    private uServ : UsuarioService
  ) { }

  ngOnInit(): void { }

  inhabilitarEsp(usuarioElegido : any){
    this.uServ.actualizarEspecialista(usuarioElegido, false);

    this.uServ.obtenerUsuarios().subscribe( respuesta =>{
      respuesta.forEach((usuario: any) => {
        if( (usuario as any).email == usuarioElegido.email){
          this.usuarioElegido = usuario;
        }
      });
    })
  }

  habilitarEsp(usuarioElegido : any){
    this.uServ.actualizarEspecialista(usuarioElegido, true);
    this.uServ.obtenerUsuarios().subscribe( respuesta =>{
      respuesta.forEach((usuario: any) => {
        if( (usuario as any).email == usuarioElegido.email){
          this.usuarioElegido = usuario;
        }
      });
    })
  }
}
