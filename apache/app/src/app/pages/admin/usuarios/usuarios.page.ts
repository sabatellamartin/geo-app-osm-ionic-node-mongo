import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

import { ModalController, ToastController } from '@ionic/angular';

import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';

import { UsuarioService } from '@core/services';

import { User } from '@models/usuario';
import { Filter, Pager } from '@models/util';

@Component({
  selector: 'admin-usuarios',
  templateUrl: 'usuarios.page.html',
  styleUrls: ['usuarios.page.scss']
})
export class UsuariosPage implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  selectedUser: User = null as User;
  usuarios: User[] = new Array<User>(); 
  filter: Filter = new Filter();
  pager: Pager = new Pager();

  constructor(
    private usuarioService: UsuarioService,
    private modalController: ModalController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.filter.filter = "";
    this.filter.fields = "name,email";
    this.filter.sort = "name";
    this.filter.order = 1;
    this.filter.limit = 12;
    this.obtenerUsuarios();
  }

  ngOnDestroy() {}

  private obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios(this.filter).subscribe((response: Pager) => {
      if (response&&response.docs&&response.docs.length>0) {
        this.pager = response;
        response.docs.forEach(element => {
          this.usuarios.push(element as User);
        });
      }
    });
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      if (this.pager.hasNextPage) {
        // Mientras existan paginas
        this.filter.page = this.filter.page+1;
        this.obtenerUsuarios();
      } else {
        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        event.target.disabled = true;
      }
    }, 500);
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.usuarios = [];
      this.filter.page = 1;
      this.obtenerUsuarios();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  toggleInfiniteScroll() {
    console.log("toggleScroll disabled: "+this.infiniteScroll.disabled);
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  editar(usuario: User) {
    this.selectedUser = usuario;
    this.formularioUsuario(usuario);
  }

  agregar() {
    let usuario = new User();
    this.selectedUser = usuario;
    this.formularioUsuario(usuario);
  }

  private async formularioUsuario(usuario: User) {
    const modal = await this.modalController.create({
      component: FormularioUsuarioComponent,
      componentProps: {
        'usuario': usuario
      },
      animated: true
    });
    await modal.present();
    modal.onDidDismiss().then(response => {
      this.filter = new Filter();
      this.obtenerUsuarios();
    });
  }

  buscar(texto) {
    this.filter.filter = texto;
    console.log(this.filter);
    this.usuarios = [];
    this.filter.page = 1;
    this.obtenerUsuarios();
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}