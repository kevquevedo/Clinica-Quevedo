import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNotImage]'
})
export class NotImageDirective {

  constructor(private imagen: ElementRef) { }

  @HostListener('error') onError () : void  {
    this.imagen.nativeElement.src = "../../../../assets/varios/especialidad-aux.jpg"
  }

}
