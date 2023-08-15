import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';

import { Operacion } from '@models/operacion';

@Component({
  selector: 'captura',
  templateUrl: './captura.component.html',
  styleUrls: ['./captura.component.scss'],
})
export class CapturaComponent implements OnInit, OnDestroy {

  @Input('operacion') operacion: Operacion;

  picture: any;
  
  // picture options
  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }

  isToBack = false;

  constructor(
    private cameraPreview: CameraPreview,
    private modalCtrl: ModalController
  ) {
    /*
    // Set the handler to run every time we take a picture
    this.cameraPreview.setOnPictureTakenHandler().subscribe((result) => {
      console.log(result);
      // do something with the result
    });*/
  }

  ngOnInit() {
    this.openCamera();
  }

  ngOnDestroy() {    
    this.stopCamera();
  }

  async cancelar() {
    await this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  public openCamera() {    
    // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: false,
      alpha: 1
    }
    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then((res) => {
        console.log(res)
    }, (err) => {
        console.log(err)
    });
  }

  private stopCamera() {
    // Stop the camera preview
    this.cameraPreview.stopCamera().then(() => {
      this.isToBack = false;
    });
  }

  takeSnapShot() {    
    // take a snap shot
    this.cameraPreview.takeSnapshot(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });
  }

  takePicture() {
    // take a picture
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });
  }

  switchCamera(){ 
    // Switch camera
    this.cameraPreview.switchCamera();
  }

  setEffect() { 
    // set color effect to negative
    this.cameraPreview.setColorEffect('negative');
  }

  clearPicture() {
    this.picture = null as any;
  }

}
