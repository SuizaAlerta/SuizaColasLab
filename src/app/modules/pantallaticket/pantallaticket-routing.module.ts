import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PantallaComponent } from './components/pantalla/pantalla.component';
import { TicketComponent } from './components/ticket/ticket.component';

const routes: Routes = [
  {
    path:'',
    component: PantallaComponent
  },
  {
    path:'ticket',
    component: TicketComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PantallaticketRoutingModule { }
