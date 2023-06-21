import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horapipe'
})
export class HorapipePipe implements PipeTransform {
  transform(valor: string): any {
    let hora = valor.substring(0,5);
    let franja = valor.substring(6,8);
    return hora + franja.toLocaleLowerCase();
  }
}
