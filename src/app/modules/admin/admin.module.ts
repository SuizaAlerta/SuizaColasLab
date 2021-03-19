import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CargarPedidosComponent } from './components/cargar-pedidos/cargar-pedidos.component';
import { PedidosCursoComponent } from './components/pedidos-curso/pedidos-curso.component';
import { PedidosFacturacionComponent } from './components/pedidos-facturacion/pedidos-facturacion.component';
import { AlmacenCargaComponent } from './components/almacen-carga/almacen-carga.component';
import { HistorialPedidosComponent } from './components/historial-pedidos/historial-pedidos.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [MainComponent, SidebarComponent, CargarPedidosComponent, PedidosCursoComponent, PedidosFacturacionComponent, AlmacenCargaComponent, HistorialPedidosComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
