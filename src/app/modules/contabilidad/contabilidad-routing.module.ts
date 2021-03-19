import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResolverService } from 'src/app/core/services/resolver.service';
import { CargarPedidosComponent } from './components/cargar-pedidos/cargar-pedidos.component';
import { MainComponent } from './components/main/main.component';
import { PedidosCursoComponent } from './components/pedidos-curso/pedidos-curso.component';
import { PedidosFacturacionComponent } from './components/pedidos-facturacion/pedidos-facturacion.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'cargarPedidos',
        component: CargarPedidosComponent,
        resolve: {
          user: ResolverService
        }
      },
      {
        path: 'pedidosCurso',
        component: PedidosCursoComponent,
        resolve: {
          user: ResolverService
        }
      },
      {
        path: 'pedidosFacturacion',
        component: PedidosFacturacionComponent,
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
export class ContabilidadRoutingModule { }
