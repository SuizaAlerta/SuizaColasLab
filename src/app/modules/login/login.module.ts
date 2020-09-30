import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { MainComponent } from './components/main/main.component';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule
  ]
})
export class LoginModule { }
