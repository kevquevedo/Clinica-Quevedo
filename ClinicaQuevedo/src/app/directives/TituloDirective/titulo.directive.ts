import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTitulo]'
})
export class TituloDirective {

  constructor(private element: ElementRef) {
    element.nativeElement.style.fontSize = '40pt';
    element.nativeElement.style.fontWeight = 'bold';
    element.nativeElement.style.color = 'red';
   }

}
