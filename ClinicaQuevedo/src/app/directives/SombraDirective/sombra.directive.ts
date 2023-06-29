import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSombra]'
})
export class SombraDirective {

  constructor(private elemento: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.elemento.nativeElement.className = 'card shadow-lg p-3 bg-success bg-opacity-10 border border-success rounded';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elemento.nativeElement.className = 'card shadow-lg p-3 bg-info bg-opacity-10 border border-info rounded';
  }
}
