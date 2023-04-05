import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PantallaticketRoutingModule } from './pantallaticket-routing.module';
import { PantallaComponent } from './components/pantalla/pantalla.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PantallaComponent, TicketComponent],
  imports: [
    CommonModule,
    PantallaticketRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PantallaticketModule { }
