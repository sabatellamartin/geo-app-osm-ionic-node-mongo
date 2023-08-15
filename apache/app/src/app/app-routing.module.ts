import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { PatrullaGuard, OperacionesGuard, ComandoGuard, AdminGuard } from '@core/guards';


const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./pages/guest/guest.module').then(m => m.GuestPageModule)
  },
  {
    path: 'patrulla',
    loadChildren: () => import('./pages/patrulla/patrulla.module').then(m => m.PatrullaPageModule), 
    canActivate: [PatrullaGuard]
  },
  { 
    path: 'operaciones', 
    loadChildren: () => import('./pages/operaciones/operaciones.module').then(m => m.OperacionesPageModule), 
    canActivate: [OperacionesGuard]
  },
  { 
    path: 'comando', 
    loadChildren: () => import('./pages/comando/comando.module').then(m => m.ComandoPageModule), 
    canActivate: [ComandoGuard]
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminPageModule), 
    canActivate: [AdminGuard] 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}