import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OperacionesPage } from './operaciones.page';
import { OperacionesGuard } from '@core/guards';

const routes: Routes = [
  {
    path: '',
    component: OperacionesPage,
    canActivate: [OperacionesGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
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
export class OperacionesPageRoutingModule {}
