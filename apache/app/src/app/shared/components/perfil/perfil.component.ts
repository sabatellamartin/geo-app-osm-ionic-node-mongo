import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { Perfil } from '@models/usuario';
import { PerfilService } from '@core/services';

import { CambiarPasswordComponent } from '@shared/components';

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit, OnDestroy {

  @Input('perfil') perfil: Perfil;
  opcionesVerificacion: any;
  changePassword: boolean = false;
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;

  constructor(
    private perfilService: PerfilService,
    private modalCtrl: ModalController,
    public toastController: ToastController) {
  }

  ngOnInit() {
    this.opcionesVerificacion = [
      {clave:'true',valor:'Verificado'},
      {clave:'false',valor:'No Verificado'}
    ];
    if (!this.perfil) {
      this.cancelar('');
    }
  }

  ngOnDestroy() {}

  toggleChangePassword() {
    this.changePassword = !this.changePassword;
  }

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

  public guardar() {
    this.perfil;
    if (!this.perfil) {
      this.presentToast('No se puede guardar el perfil');
      return;
    }
    if (!this.perfil.email) {
      this.presentToast('Escriba el email del antes de guardar el perfil');
      return;
    }
    if (!this.perfil.name) {
      this.presentToast('Escriba el su nombre del antes de guardar el perfil');
      return;
    }
    this.perfilService.actualizarPerfil(this.perfil).subscribe((response:any) => {
      if(response) {
        this.cancelar('Perfil actualizado');
      }
    });
  }

  async cancelar(mensaje: string) {
    await this.modalCtrl.dismiss({
      'perfil': this.perfil,
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

  compareFnClave(o1: any, o2: any) {
    return o1 && o2 ? o1.clave === o2.clave : o1 === o2;
  }
  
  compareFn(o1: any, o2: any) {
    return o1 && o2 ? o1._id === o2._id : o1 === o2;
  }
  
  public async abrirCambiarPassword() {
    if (!this.perfil) { return }
    const modal = await this.modalCtrl.create({
      component: CambiarPasswordComponent,
      componentProps: {
        'perfil': this.perfil
      },
      animated: true
    });
    await modal.present();
    modal.onDidDismiss().then(response => {
      console.log(response);
    });
  }

}
