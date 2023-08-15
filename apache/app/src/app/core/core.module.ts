import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';

import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AuthInterceptor } from './interceptors';

import * as fromServices from './services';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { environment } from '@env';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: environment.storageDatabaseName,
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    })
  ],
  providers: [
    fromServices.providers,
    Geolocation,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule {}
