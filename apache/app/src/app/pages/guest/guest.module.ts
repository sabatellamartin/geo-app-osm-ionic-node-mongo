import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestPageRoutingModule } from './guest.router.module';

//import { GuestPage } from './guest.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    GuestPageRoutingModule
  ],
  declarations: [
    //GuestPage
  ],
  entryComponents: []
})
export class GuestPageModule {}
