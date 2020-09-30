import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HubRoutingModule } from './hub-routing.module';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [MainComponent, NavbarComponent],
  imports: [
    CommonModule,
    HubRoutingModule
  ]
})
export class HubModule { }
