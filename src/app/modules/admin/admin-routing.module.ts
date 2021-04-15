import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ResolverService } from 'src/app/core/services/resolver.service';

import { MapsComponent } from './components/maps/maps.component';
import { UnidadesActualesComponent } from './components/unidades-actuales/unidades-actuales.component';
import { BasePersonalComponent } from './components/base-personal/base-personal.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { ReportePilotoComponent } from './components/reporte-piloto/reporte-piloto.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'mapaGPS',
        component: MapsComponent,
        resolve: {
          user: ResolverService
        }
      },
      {
        path: 'unidadesActuales',
        component: UnidadesActualesComponent,
        resolve: {
          user: ResolverService
        }
      },
      {
        path: 'personalActivo',
        component: BasePersonalComponent,
        resolve: {
          user: ResolverService
        }
      },
      {
        path: 'mantenimiento',
        component: MantenimientoComponent,
        resolve: {
          user: ResolverService
        }
      },
      {
        path: 'reporte-pilotos',
        component: ReportePilotoComponent,
        resolve: {
          user: ResolverService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
