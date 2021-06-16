import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PilotosRoutingModule } from './pilotos-routing.module';
import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ReportePilotoComponent } from './components/reporte-piloto/reporte-piloto.component';
import { ReporteCargaExitosaComponent } from './components/reporte-carga-exitosa/reporte-carga-exitosa.component';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoRegistrosComponent } from './components/listado-registros/listado-registros.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [MainComponent, SidebarComponent, ReportePilotoComponent, ReporteCargaExitosaComponent, ListadoRegistrosComponent],
  imports: [
    CommonModule,
    PilotosRoutingModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PilotosModule { }
