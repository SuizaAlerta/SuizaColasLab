import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { MapsComponent } from './components/maps/maps.component';
import { AgmCoreModule } from '@agm/core';
import { UnidadesActualesComponent } from './components/unidades-actuales/unidades-actuales.component';
import { BasePersonalComponent } from './components/base-personal/base-personal.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [MainComponent, SidebarComponent, MapsComponent, UnidadesActualesComponent, BasePersonalComponent, MantenimientoComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAatGQSRkWM-3S5bWF0WX_qA7bLQ7ZmI8',
      libraries: ['places']
    })
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
