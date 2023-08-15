import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ModalController, ToastController, IonInfiniteScroll, PopoverController, AlertController } from '@ionic/angular';

import { VerOperacionComponent } from '@shared/components';
import { RecorridoComponent } from '@shared/components';

import { Operacion } from '@models/operacion';

import { Filter, Pager } from '@models/util';
import { User } from '@models/usuario';

import { OperacionService, UsuarioService } from '@core/services';

import { OpcionesOperacionComponent } from './opciones-operacion/opciones-operacion.component';

@Component({
  selector: 'listar-operaciones',
  templateUrl: './listar-operaciones.component.html',
  styleUrls: ['./listar-operaciones.component.scss'],
})
export class ListarOperacionesComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  filtro: Filter = new Filter();
  pager: Pager = new Pager();

  operaciones: Operacion[] = new Array<Operacion>();

  search: boolean = false;

  constructor(
    private operacionService: OperacionService,
    private usuarioService: UsuarioService,
    private modalController: ModalController,
    public toastController: ToastController,
    public popoverController: PopoverController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.filtro.fields = "nombre";
    this.filtro.sort = "timestamp";
    this.filtro.limit = 12;
    this.filtro.page = 1;
    this.obtenerOperaciones();
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}

  activeSearch() {
    this.search = !this.search;
  }

  private obtenerOperaciones() {
    this.operacionService.obtenerOperaciones(this.filtro).subscribe((response: Pager) => {
      if (response&&response.docs&&response.docs.length>0) {
        this.pager = response;
        response.docs.forEach(element => {
          /*element = element as Operacion;
          if (element&&element.user) {
            this.usuarioService.obtenerFullUsuario(element.user.toString()).subscribe((usuario:User)=> {
              element.user = usuario;*/
              //console.log(element);
              this.operaciones.push(element as Operacion);
          /*  });
          }*/
        });
      }
    });
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      if (this.pager.hasNextPage) {
        // Mientras existan paginas
        this.filtro.page = this.filtro.page+1;
        this.obtenerOperaciones();
      } else {
        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        event.target.disabled = true;
      }
    }, 500);
  }

  public async verOperacion(operacion: Operacion) {
    const modal = await this.modalController.create({
      component: VerOperacionComponent,
      cssClass: 'lg-modal-class',
      componentProps: {
        'operacion': operacion
      },
      animated: true
    });
    await modal.present();
    modal.onDidDismiss().then(response => {
      //console.log(response);
    });
  }

  removerOperacion(operacion: Operacion) {
    if (operacion&&operacion._id) {
      this.operacionService.removerOperacion(operacion._id).subscribe((response: any) => {
        if (response) {
          this.obtenerOperaciones();
        }
      });
    }
  }

  iniciarOperacion(operacion: Operacion) {
    this.modalRecorrido(operacion);
  }

  private async modalRecorrido(operacion: Operacion) {
    const modal = await this.modalController.create({
      component: RecorridoComponent,
      componentProps: {
        'operacion': operacion
      },
      animated: true
    });
    await modal.present();
    modal.onDidDismiss().then(response => {
      //console.log(response);
    });
  }
  
  doRefresh(event) {
    console.log('Begin async operation');
    this.operaciones = [];
    this.filtro.page = 1;
    this.obtenerOperaciones();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  buscar(texto) {
    this.filtro.filter = texto;
    this.operaciones = [];
    this.filtro.page = 1;
    this.obtenerOperaciones();
  }

  async opcionesOperacion(ev: any, operacion: Operacion) {
    const popover = await this.popoverController.create({
      component: OpcionesOperacionComponent,
      event: ev, // Captura evento para determinar la posicion del popover
      translucent: true,
      componentProps:  { operacion: operacion }, // Pasa parametros
      animated: true,
      showBackdrop: true,
      backdropDismiss: true, // false: No se cierra si no tiene interaccion en el popover
      mode: "ios" // Activa el modo de visualizacion de ios
    });
    await popover.present();
    popover.onDidDismiss().then(response => {
      let opcionId = response.data as string;
      if(opcionId=='eliminar') {
        this.alertEliminarOperacion(operacion);
      } else if(opcionId=='detalles') {
        this.verOperacion(operacion);
      }
    });
  }

  private async alertEliminarOperacion(operacion: Operacion) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: '¿Estás de acuerdo con eliminar la operación '+(operacion&&operacion.nombre?operacion.nombre:'')+'?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentToast("La operación no fue eliminada.");
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.removerOperacion(operacion);
          }
        }
      ]
    });
    await alert.present();
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}