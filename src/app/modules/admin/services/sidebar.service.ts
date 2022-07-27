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
      title: 'Dashboard',
      icon: 'fa fa-pie-chart',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Dashboard',
          icon: "fa fa-pie-chart",
          route: "dashboard"
        }
      ]
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
          title: 'Descargar reporte',
          icon: "fa fa-address-card",
          route: "reporte-motos"
        }
      ]
    },
    {
      title: 'Listado de Personal',
      icon: 'fa fa-user-o',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Personal Activo',
          icon: "fa fa-user-o",
          route: "personalActivo"
        }
      ]
    },
    {
      title: 'Operaciones',
      icon: 'fa fa-cog',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Consolidado',
          icon: "fa fa-cog",
          route: "consolidado"
        },
        {
          title: 'Lista de Registros',
          icon: "fa fa-cog",
          route: "lista-registros"
        },
        {
          title: 'Reporte Piloto',
          icon: "fa fa-cog",
          route: "reporte-pilotos"
        }
      ]
    },
    {
      title: 'Paneles',
      icon: 'fa fa-area-chart',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Revisión Técnica',
          icon: "fa fa-eye",
          route: "revision-tecnica"
        }
      ]
    },
    {
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
