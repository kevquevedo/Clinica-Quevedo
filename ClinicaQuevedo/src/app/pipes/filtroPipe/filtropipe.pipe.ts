import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtropipe'
})
export class FiltropipePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for (const post of value){
      if (post.especialidad.toLowerCase().indexOf(arg.toLowerCase()) > -1 || post.especialista.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPosts.push(post)
      }
    }
    return resultPosts;
  }

}
