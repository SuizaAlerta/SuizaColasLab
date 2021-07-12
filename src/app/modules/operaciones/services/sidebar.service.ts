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
      title: 'Mapa',
      icon: 'fa fa-map-marker ',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Mapa GPS',
          icon: "fa fa-map-o",
          route: "mapaGPS"
        },
        {
          title: 'Unidades actuales',
          icon: "fa fa-address-card",
          route: "unidadesActuales"
        },
        {
          title: 'Descargar Reporte',
          icon: "fa fa-download",
          route: "reporte-motos"
        }
      ]
    },/* ,
    {
      title: 'Operaciones',
      icon: 'fa fa-cog',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Consolidado',
          icon: "fa fa-list",
          route: "consolidado-unidades"
        },
        {
          title: 'Lista de Registros',
          icon: "fa fa-list",
          route: "lista-registros"
        }
      ]
    }, */
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
