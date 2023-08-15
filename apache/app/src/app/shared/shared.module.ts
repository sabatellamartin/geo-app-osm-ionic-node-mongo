import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { IonicModule } from '@ionic/angular';

import * as fromComponents from './components';
import * as fromPipes from './pipes';

import { CameraPreview } from '@ionic-native/camera-preview/ngx';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    fromComponents.components,
    fromPipes.pipes
  ],
  entryComponents: [
    fromComponents.entryComponents
  ],
  exports: [
    fromComponents.components
  ],
  providers: [
    CameraPreview
  ]
})
export class SharedModule {}
