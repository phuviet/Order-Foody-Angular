import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { DialogItem } from '../dialog/dialog-item';

@Injectable()
export class DialogService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  loadComponent(viewContainerRef: ViewContainerRef, dialogItem: DialogItem) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(dialogItem.component);
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    let instance: any = componentRef.instance;
    instance.dialog = dialogItem.dialog;
  }
}
