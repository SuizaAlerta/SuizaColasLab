import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ResolverService } from 'src/app/core/services/resolver.service';
import { CargarPedidosComponent } from './components/cargar-pedidos/cargar-pedidos.component';
import { PedidosCursoComponent } from './components/pedidos-curso/pedidos-curso.component';
import { PedidosFacturacionComponent } from './components/pedidos-facturacion/pedidos-facturacion.component';
import { AlmacenCargaComponent } from './components/almacen-carga/almacen-carga.component';
import { RoleGuard } from '../../core/guards/role.guard';
import { HistorialPedidosComponent } from './components/historial-pedidos/historial-pedidos.component';

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
        path: 'pedidosCobranza',
        component: PedidosFacturacionComponent,
        resolve: {
          user: ResolverService
        }
      },
      {
        path: 'historialPedidos',
        component: HistorialPedidosComponent,
        resolve: {
          user: ResolverService
        }
      },
      {
        path: 'almacenCarga',
        component: AlmacenCargaComponent,
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
