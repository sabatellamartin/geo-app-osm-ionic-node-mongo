import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminPageRoutingModule } from './admin.router.module';

import { AdminPage } from './admin.page';
//import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AdminPageRoutingModule//,
    //SharedModule
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
