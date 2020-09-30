import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ResolverService } from 'src/app/core/services/resolver.service';
import { Formulario1Component } from './components/formulario1/formulario1.component';
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'formulario1',
        component: Formulario1Component,
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
