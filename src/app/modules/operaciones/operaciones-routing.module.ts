import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResolverService } from 'src/app/core/services/resolver.service';
import { ListaRegistroComponent } from '../admin/components/lista-registro/lista-registro.component';
import { MapsComponent } from '../admin/components/maps/maps.component';
import { ReporteCargaExitosaComponent } from './components/reporte-carga-exitosa/reporte-carga-exitosa.component';
import { ReportePilotoComponent } from './components/reporte-piloto/reporte-piloto.component';
import { UnidadesActualesComponent } from '../admin/components/unidades-actuales/unidades-actuales.component';
import { MainComponent } from './components/main/main.component';
import { ConsolidadoUnidadesComponent } from '../admin/components/consolidado-unidades/consolidado-unidades.component';
import { ReporteMotosComponent } from '../admin/components/reporte-motos/reporte-motos.component';
import { RegistrarUsuarioComponent } from '../admin/components/registrar-usuario/registrar-usuario.component';
import { AsignarAtencionComponent } from './components/asignar-atencion/asignar-atencion.component';
import { RegistroAtencionesComponent } from './components/registro-atenciones/registro-atenciones.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'registrar-usuario',
        component: RegistrarUsuarioComponent,
        resolve: {
          user: ResolverService
        }
      },
      {
        path: 'asignar-atencion',
        component:AsignarAtencionComponent,
        resolve: {
          user: ResolverService
        }
      },
      {
        path: 'registro-atenciones',
        component:RegistroAtencionesComponent,
        resolve: {
          user: ResolverService
        }
      },
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
        path: 'reporte-motos',
        component: ReporteMotosComponent,
        resolve: {
          user: ResolverService
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperacionesRoutingModule { }
