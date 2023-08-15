import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatrullaPage } from './patrulla.page';
import { PatrullaGuard } from '@core/guards/patrulla.guard';

const routes: Routes = [
  {
    path: '',
    component: PatrullaPage,
    canActivate: [PatrullaGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'operaciones',
        loadChildren: () => import('./operaciones/operaciones.module').then(m => m.OperacionesPageModule)
      },/*
      {
        path: 'tab2',
        loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
      },*/
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
})
export class PatrullaPageRoutingModule {}