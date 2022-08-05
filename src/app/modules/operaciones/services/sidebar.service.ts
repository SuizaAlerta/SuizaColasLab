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
      title: 'USUARIO',
      icon: 'fa fa-user',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Crear Nuevo Usuario',
          icon: "fa fa-user",
          route: "registrar-usuario"
        }
      ]
    },
    {
      title: 'LOCALIZACIÓN',
      icon: 'fa fa-map-marker',
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
    },
     {
      title: 'ATENCIONES',
      icon: 'fa fa-motorcycle',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Registrar Atención',
          icon: "fa fa-plus-circle",
          route: "asignar-atencion"
        },
        {
          title: 'Lista de Atenciones',
          icon: "fa fa-file-text-o",
          route: "registro-atenciones"
        },
        {
          title: 'Seguimiento',
          icon: "fa fa-file-text-o",
          route: "seguimiento"
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
