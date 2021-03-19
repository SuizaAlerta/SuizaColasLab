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
      title: 'Administrador',
      icon: 'fa fa-user-o',
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
          title: 'Pedidos en cobranza',
          icon: "fa fa-credit-card",
          route: 'pedidosCobranza'
        },
        /* {
          title: 'Historial de Pedidos',
          icon: "fa fa-list",
          route: 'historialPedidos'
        }, */
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
