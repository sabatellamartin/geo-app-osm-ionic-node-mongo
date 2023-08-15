import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OperacionesPageRoutingModule } from './operaciones.router.module';

import { OperacionesPage } from './operaciones.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    OperacionesPageRoutingModule
  ],
  declarations: [OperacionesPage]
})
export class OperacionesPageModule {}
