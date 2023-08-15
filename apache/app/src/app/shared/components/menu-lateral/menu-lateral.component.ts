import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { Perfil } from '@models/usuario';
import { PerfilService, AuthService } from '@core/services';

import { environment } from '@env';

import { PerfilComponent } from '@shared/components';

@Component({
  selector: 'menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent implements OnInit, OnDestroy {
  
  perfil: Perfil;
  private perfilSubscription: Subscription;
  version: string;
  entradas: Array<any> = new Array<any>();
  appPath: string = environment.appPath;
  
  constructor(
    private menu: MenuController,
    private modalController: ModalController,
    private perfilService: PerfilService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.version = environment.version;
  }

  ngOnDestroy() {
    this.perfilSubscription.unsubscribe();
  }

  menuOpened() {
    if(!this.perfil) {
      this.perfilSubscription = this.perfilService.obtenerPerfil().subscribe((perfil: Perfil) => {
        if(perfil) {
          this.perfil = perfil;
          this.cargarEntradas();
        }
      });
    }
  }

  menuClosed() {
    this.perfilSubscription.unsubscribe();
  }

  private cargarEntradas() {
    this.entradas = new Array<any>();
    if (!this.perfil) { return }
    if (this.perfil.role==environment.ADMINISTRADOR) {
      this.entradas.push({ title: 'Inicio', url: '/admin/home', icon: 'home' });
      this.entradas.push({ title: 'Operaciones', url: '/admin/operaciones', icon: 'locate' });
      this.entradas.push({ title: 'Usuarios', url: '/admin/usuarios', icon: 'people' });
      this.entradas.push({ title: 'Organismos', url: '/admin/organismos', icon: 'business' });
    } else if (this.perfil.role==environment.COMANDO) {
      this.entradas.push({ title: 'Inicio', url: '/comando/home', icon: 'home' });
    } else if (this.perfil.role==environment.OPERACIONES) {
      this.entradas.push({ title: 'Inicio', url: '/operaciones/home', icon: 'home' });
    } else if (this.perfil.role==environment.PATRULLA) {
      this.entradas.push({ title: 'Inicio', url: '/patrulla/home', icon: 'home' });
      this.entradas.push({ title: 'Operaciones', url: '/patrulla/operaciones', icon: 'locate' });
    }
  }

  logout() {
    this.authService.logout();
  }

  public irAPerfil() {
    this.closeFirst();
    this.abrirPerfil();
  }

  public closeFirst() {
    this.menu.close('first');
  }

  private async abrirPerfil() {
    if (!this.perfil) { return }
    const modal = await this.modalController.create({
      component: PerfilComponent,
      componentProps: {
        'perfil': this.perfil
      },
      animated: true
    });
    await modal.present();
    modal.onDidDismiss().then(response => {
      console.log(response);
      this.menuOpened();
    });
  }

  public descargarApp() {
    fetch(this.appPath)
        .then(resp => resp.blob())
        .then(blobobject => {
            let downloadURL = window.URL.createObjectURL(blobobject);
            //let downloadURL = this.appPath;
            let link = document.createElement('a');
            link.href = downloadURL;
            link.style.display = 'none';
            let d = new Date();
            link.download = "geoapp_"+d.getFullYear()+d.getMonth()+d.getDate()+".apk";
            //document.body.appendChild(link);
            link.click();
            link.remove();
        })
        .catch(() => console.log('Ocurrió un error al descargar la aplicación.'));
  }

  
  public descargarAppCloud() {
    //const blob = new Blob(data, { type: 'text/plain' });
    //const downloadURL= window.URL.createObjectURL(blob);
    //window.open(downloadURL);
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = 'link_to_app'
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}