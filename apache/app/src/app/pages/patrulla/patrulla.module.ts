import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PatrullaPageRoutingModule } from './patrulla.routing.module';

import { PatrullaPage } from './patrulla.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PatrullaPageRoutingModule
  ],
  declarations: [PatrullaPage]
})
export class PatrullaPageModule {}
