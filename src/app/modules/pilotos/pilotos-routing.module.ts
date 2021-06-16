import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResolverService } from 'src/app/core/services/resolver.service';
import { ListadoRegistrosComponent } from './components/listado-registros/listado-registros.component';
import { MainComponent } from './components/main/main.component';
import { ReporteCargaExitosaComponent } from './components/reporte-carga-exitosa/reporte-carga-exitosa.component';
import { ReportePilotoComponent } from './components/reporte-piloto/reporte-piloto.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'reporte-pilotos',
        component: ReportePilotoComponent,
        resolve: {
          user: ResolverService
        }
      },
      {
        path: 'listado-registros',
        component: ListadoRegistrosComponent,
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
export class PilotosRoutingModule { }