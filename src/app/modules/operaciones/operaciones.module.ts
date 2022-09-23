import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { HttpClientModule } from '@angular/common/http';


import { OperacionesRoutingModule } from './operaciones-routing.module';
import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ReportePilotoComponent } from './components/reporte-piloto/reporte-piloto.component';
import { ReporteCargaExitosaComponent } from './components/reporte-carga-exitosa/reporte-carga-exitosa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsignarAtencionComponent } from './components/asignar-atencion/asignar-atencion.component';
import { RegistroAtencionesComponent } from './components/registro-atenciones/registro-atenciones.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { AtencionesMotorizadosComponent } from './components/atenciones-motorizados/atenciones-motorizados.component';
import {ConnectionServiceModule} from 'ng-connection-service';
import {NgxPrintModule} from 'ngx-print';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [MainComponent, SidebarComponent, ReportePilotoComponent, ReporteCargaExitosaComponent, AsignarAtencionComponent, RegistroAtencionesComponent, CrearUsuarioComponent, AtencionesMotorizadosComponent],
  imports: [
    CommonModule,
    OperacionesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPrintModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperacionesModule { }
