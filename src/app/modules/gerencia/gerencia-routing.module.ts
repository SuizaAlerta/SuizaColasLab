import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResolverService } from 'src/app/core/services/resolver.service';
import { ListaRegistroComponent } from '../admin/components/lista-registro/lista-registro.component';
import { MapsComponent } from '../admin/components/maps/maps.component';
import { UnidadesActualesComponent } from '../admin/components/unidades-actuales/unidades-actuales.component';
import { MainComponent } from './components/main/main.component';
import { ReporteCargaExitosaComponent } from './components/reporte-carga-exitosa/reporte-carga-exitosa.component';
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
        path: 'lista-registros',
        component: ListaRegistroComponent,
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
      },
      {
        path: 'carga-exitosa',
        component: ReporteCargaExitosaComponent,
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
export class GerenciaRoutingModule { }