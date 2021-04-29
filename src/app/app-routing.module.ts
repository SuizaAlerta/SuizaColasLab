import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { RoleGuard } from './core/guards/role.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'hub',
    loadChildren: () => import('./modules/hub/hub.module').then(m => m.HubModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canLoad: [RoleGuard],
    data: { expectedRoles: ['admin']}
  },
  {
    path: 'operaciones',
    loadChildren: () => import('./modules/operaciones/operaciones.module').then(m => m.OperacionesModule),
    canLoad: [RoleGuard],
    data: { expectedRoles: ['operaciones']}
  },
  {
    path: 'gerencia',
    loadChildren: () => import('./modules/gerencia/gerencia.module').then(m => m.GerenciaModule),
    canLoad: [RoleGuard],
    data: { expectedRoles: ['gerencia']}
  },
  {
    path: 'pilotos',
    loadChildren: () => import('./modules/pilotos/pilotos.module').then(m => m.PilotosModule),
    canLoad: [RoleGuard],
    data: { expectedRoles: ['pilotos']}
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
