import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { PerfilService } from '@core/services';

@Component({
  selector: 'cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.scss'],
})
export class CambiarPasswordComponent implements OnInit, OnDestroy {

  oldPassword: string;
  newPassword: string;
  repeatPassword: string;

  constructor(
    private perfilService: PerfilService,
    private modalCtrl: ModalController,
    public toastController: ToastController) {
  }

  ngOnInit() {}

  ngOnDestroy() {}


  cambiarPassword() {
    if (!this.oldPassword||!this.newPassword||!this.repeatPassword) {
      this.presentToast('Ingrese una contraseña antes de cambiar.');
      return;
    }
    if (this.newPassword.length<6) {
      this.presentToast('Ingrese una contraseña de al menos 6 caracteres.');
      return;
    }
    if (this.newPassword.length>50) {
      this.presentToast('Contraseña demasiado larga.');
      return;
    }
    if (this.newPassword!=this.repeatPassword) {
      this.presentToast('Las contraseñas no coinciden.');
      return;
    }
    this.perfilService.cambiarPassword(this.oldPassword, this.newPassword).subscribe((response:any) => {
      if(response) {
        this.cancelar('Contraseña actualizada');
      }
    });
  }

  async cancelar(mensaje: string) {
    await this.modalCtrl.dismiss({
      'mensaje': mensaje
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  
}
