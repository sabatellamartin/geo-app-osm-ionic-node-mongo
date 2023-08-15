import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComandoPageRoutingModule } from './comando.router.module';

import { ComandoPage } from './comando.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComandoPageRoutingModule
  ],
  declarations: [ComandoPage]
})
export class ComandoPageModule {}
