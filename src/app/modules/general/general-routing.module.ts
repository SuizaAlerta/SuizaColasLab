import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FichaSintomatologiaComponent } from './components/ficha-sintomatologia/ficha-sintomatologia.component';

const routes: Routes = [
  {
    path: '',
    component: FichaSintomatologiaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
