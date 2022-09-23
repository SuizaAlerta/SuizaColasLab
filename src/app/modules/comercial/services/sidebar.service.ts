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
      title: 'REFERENCIAS',
      icon: 'fa fa-user',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Lista Resferencias',
          icon: "fa fa-user",
          route: "referencias"
        }
      ]
    },
    {
      title: 'ATENCIONES',
      icon: 'fa fa-motorcycle',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Atenciones Hoy',
          icon: "fa fa-clock-o",
          route: "atencionesMotorizados"
        },
        {
          title: 'Lista Atenciones',
          icon: "fa fa-list",
          route: "lista-atenciones"
        }
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
