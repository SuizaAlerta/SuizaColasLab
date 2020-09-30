import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HubResolverService } from 'src/app/core/services/hub-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    resolve: {
      user: HubResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HubRoutingModule { }
