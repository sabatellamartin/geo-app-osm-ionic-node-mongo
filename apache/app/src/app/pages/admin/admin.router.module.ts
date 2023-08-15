import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPage } from './admin.page';
import { AdminGuard } from '@core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosPageModule)
      },
      {
        path: 'organismos',
        loadChildren: () => import('./organismos/organismos.module').then(m => m.OrganismosPageModule)
      },
      {
        path: 'operaciones',
        loadChildren: () => import('./operaciones/operaciones.module').then(m => m.OperacionesPageModule)
      },
      {
        path: 'monitor',
        loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule {}
