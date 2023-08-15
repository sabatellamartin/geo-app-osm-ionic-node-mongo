import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MonitorPage } from './monitor.page';

import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MonitorPage
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
    MonitorPage
  ],
  entryComponents: []
})
export class MonitorPageModule {}
