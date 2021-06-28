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
      title: 'Pilotos',
      icon: 'fa fa-cog',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Reporte Digital',
          icon: "fa fa-cog",
          route: "reporte-pilotosv2"
        },
        {
          title: 'Listado de Registros',
          icon: "fa fa-list",
          route: "listado-registros"
        }
      ]
    },
    /* {
      title: 'Oficina',
      icon: 'fa fa-cube',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Cargar Pedidos',
          icon: "fa fa-car",
          route: "cargarPedidos"
        },
        {
          title: 'Ver Pedidos',
          icon: "fa fa-cubes",
          route: "almacenCarga"
        }
      ]
    },
    {
      title: 'Almacén',
      icon: 'fa fa-cube',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Cargar Pedidos',
          icon: "fa fa-cubes",
          route: "almacenCarga"
        }
      ]
    }, */
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
