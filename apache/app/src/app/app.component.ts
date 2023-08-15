import { Component, OnDestroy, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StorageService } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    public platform: Platform,
    private storage: StorageService) {
    this.platform.ready().then(() => {
      this.storage.init();
    });
  }

  ngOnInit() {}

  ngOnDestroy() {}

}