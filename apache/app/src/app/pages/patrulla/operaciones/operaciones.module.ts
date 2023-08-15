import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OperacionesPage } from './operaciones.page';

import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: OperacionesPage
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    OperacionesPage
  ],
  entryComponents: []
})
export class OperacionesPageModule {}
