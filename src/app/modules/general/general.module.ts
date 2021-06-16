import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GeneralRoutingModule } from './general-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    HttpClientModule,
  ]
})
export class GeneralModule { }
