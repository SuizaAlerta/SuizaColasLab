import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'Menú',
      type: 'header'
    },
    {
      title: 'TALLERES',
      icon: 'fa fa-sticky-note-o',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Control de Carrito',
          icon: "fa fa-car",
          route: "formulario1"
        },
        {
          title: 'Control de Brazo Serial',
          icon: "fa fa-code-fork",
          route: 'control/brazoserial'
        },
      ]
    },
    
    {
      title: 'Salir',
      icon: 'fa fa-sign-out',
      active: true,
      type: 'simple'
    }

  ];

  constructor() { }

  toggle() {
    this.toggled = !this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
