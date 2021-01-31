import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private _overlay: Overlay, private _injector: Injector) { }

  public open<T>(componentType: ComponentType<T>): T {

    const positionStrategy = this._overlay.position()
    .global()
    .centerHorizontally()
    .centerVertically();

    const overlayRef = this._overlay.create({
      hasBackdrop: true,
      positionStrategy
    });

    const injectionTokens = new WeakMap();

    injectionTokens.set(OverlayRef, overlayRef);

    const injector = new PortalInjector(this._injector, injectionTokens);

    const componentRef = overlayRef.attach(new ComponentPortal(componentType, null, injector));

    return componentRef.instance;
  }  
}
