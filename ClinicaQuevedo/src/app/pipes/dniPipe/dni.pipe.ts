import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dniPipe'
})
export class DniPipe implements PipeTransform {

  transform(valor: any): any {
    return (valor as string).substring(0,2) + '.' + (valor as string).substring(2,5 ) + '.' + (valor as string).substring(5,8);
  }

}
