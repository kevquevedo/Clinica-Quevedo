import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtropipe'
})
export class FiltropipePipe implements PipeTransform {

  transform(value: any, arg: any): any {

    if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for (const post of value){
      if (post.especialidad.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.especialista.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.especialista.apellido.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.paciente.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.paciente.apellido.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.fecha.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.hora.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.comentarioPac.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.resenia.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.estado.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPosts.push(post)
      }
    }
    return resultPosts;
  }

}
