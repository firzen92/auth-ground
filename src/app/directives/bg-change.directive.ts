import { AfterViewInit, Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBgChange]'
})
export class BgChangeDirective  {

  @HostListener('mouseover') mouseover(eventData: Event) {
    this.renderer.setStyle(this.element.nativeElement, 'background', 'grey');
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(this.element.nativeElement, 'background', '#337ab7');
  }

  constructor(private renderer: Renderer2,
              private element: ElementRef) { }

}
