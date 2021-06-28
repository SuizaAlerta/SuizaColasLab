import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargaExitosaComponent } from './components/carga-exitosa/carga-exitosa.component';
import { FichaSintomatologiaComponent } from './components/ficha-sintomatologia/ficha-sintomatologia.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
  },
  {
    path: 'ficha-sintomatologica',
    component: FichaSintomatologiaComponent,
  },
  {
    path: 'carga-exitosa',
    component: CargaExitosaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
