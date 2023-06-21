import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'historiaspipe'
})
export class HistoriasPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    if (arg === '' || arg.length < 2) return value;
    const resultPosts = [];
    for (const post of value){
      if (String(post.altura).toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.clave1.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.clave2.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.clave3.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          String(post.peso).toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          String(post.presion).toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          String(post.temperatura).toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.valor1.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.valor2.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.valor3.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.comentario.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.turno.especialidad.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.turno.fecha.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.turno.hora.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.turno.especialista.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.turno.especialista.apellido.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.turno.paciente.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.turno.paciente.apellido.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPosts.push(post)
      }
    }
    return resultPosts;
  }

}
