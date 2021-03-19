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
      title: 'Contabilidad',
      icon: 'fa fa-line-chart',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Cargar Pedidos',
          icon: "fa fa-upload",
          route: "cargarPedidos"
        },
        {
          title: 'Pedidos en curso',
          icon: "fa fa-list-alt",
          route: 'pedidosCurso'
        },
        {
          title: 'Pedidos en facturación',
          icon: "fa fa-credit-card",
          route: 'pedidosFacturacion'
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
