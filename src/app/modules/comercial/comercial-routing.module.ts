import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResolverService } from 'src/app/core/services/resolver.service';
import { AtencionesMotorizadosComponent } from './components/atenciones-motorizados/atenciones-motorizados.component';
import { ListaAtencionesComponent } from './components/lista-atenciones/lista-atenciones.component';
import { MainComponent } from './components/main/main.component';
import { ReferenciasComponent } from './components/referencias/referencias.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'referencias',
        component: ReferenciasComponent,
        resolve: {
          user: ResolverService
        }
      },
      {
        path: 'atencionesMotorizados',
        component: AtencionesMotorizadosComponent,
        resolve: {
          user: ResolverService
        }
      },
      {
        path: 'lista-atenciones',
        component: ListaAtencionesComponent,
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
export class ComercialRoutingModule { }
