import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechapipe'
})
export class FechaPipe implements PipeTransform {

  transform(valor: string): any  {
    return valor.substring(0,2) + '-' + valor.substring(3,5) + '-' + valor.substring(6,10);
  }

}
