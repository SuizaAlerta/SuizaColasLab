import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResolverService } from 'src/app/core/services/resolver.service';
import { MainComponent } from './components/main/main.component';
import { PedidosCursoComponent } from './components/pedidos-curso/pedidos-curso.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'pedidosCurso',
        component: PedidosCursoComponent,
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
export class AlmacenRoutingModule { }
