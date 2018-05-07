import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dialogContent]'
})
export class CustomDialogDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
