import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GeneralRoutingModule } from './general-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CargaExitosaComponent } from './components/carga-exitosa/carga-exitosa.component';
import { InicioComponent } from './inicio/inicio.component';


@NgModule({
  declarations: [CargaExitosaComponent, InicioComponent],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class GeneralModule { }
