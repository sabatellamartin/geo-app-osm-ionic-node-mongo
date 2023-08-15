import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ModalController, PopoverController, ToastController, AlertController } from '@ionic/angular';

import { FormularioOperacionComponent } from '@shared/components';
import { VerOperacionComponent } from '@shared/components';
import { RecorridoComponent } from '@shared/components';

import { OpcionesOperacionActivaComponent } from './opciones-operacion-activa/opciones-operacion-activa.component';

import { Operacion } from '@models/operacion';
import { Filter } from '@models/util';

import { 
  OperacionService, 
  ReporteService, 
  MensajeService,
  RecorridoService,
  EstadoService
} from '@core/services';

@Component({
  selector: 'operaciones-activas',
  templateUrl: './operaciones-activas.component.html',
  styleUrls: ['./operaciones-activas.component.scss'],
})
export class OperacionesActivasComponent implements OnInit, OnDestroy, AfterViewInit {

  operaciones: Operacion[];
  filter: Filter = new Filter();

  constructor(
    private operacionService: OperacionService,
    private estadoService: EstadoService,
    private reporteService: ReporteService,
    private mensajeService: MensajeService,
    private recorridoService: RecorridoService,
    private modalController: ModalController,
    public toastController: ToastController,
    public popoverController: PopoverController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.obtenerOperaciones();
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}

  private obtenerOperaciones() {
    this.operacionService.obtenerOperacionesLocal().then(operaciones => {
      if (operaciones&&operaciones.length>0) {
        if (this.filter.filter&&this.filter.filter.length>0) {
          this.operaciones = operaciones.filter((o:Operacion) => o.nombre.toLowerCase().includes(this.filter.filter.toLowerCase()));
        } else {
          this.operaciones = operaciones;
        }
      } else {
        this.operaciones = new Array<Operacion>();
      }
    });
  }

  private async verOperacion(operacion: Operacion) {
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
      this.obtenerOperaciones();
    });
  }

  eliminarOperacion(operacion: Operacion) {
    this.removerOperacion(operacion);
    this.operacionService.eliminarOperacion(operacion).then(() => {
      this.obtenerOperaciones();
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

  public async formularioOperacion(operacion: Operacion|null) {
    const modal = await this.modalController.create({
      component: FormularioOperacionComponent,
      componentProps: {
        'operacion': operacion?operacion:new Operacion()
      },
      animated: true
    });
    await modal.present();
    modal.onDidDismiss().then(response => {
      this.obtenerOperaciones();
    });
  }

  public async modalRecorrido(operacion: Operacion) {
    const modal = await this.modalController.create({
      component: RecorridoComponent,
      componentProps: {
        'operacion': operacion
      },
      animated: true
    });
    await modal.present();
    modal.onDidDismiss().then(response => {
      this.obtenerOperaciones();
    });
  }

  public sincronizarOperaciones() {
    this.operaciones.forEach((operacion:Operacion) => {
      if (operacion&&!operacion._id) {
        this.crearOperacion(operacion);
      } else if(operacion&&operacion._id) {
        this.actualizarOperacion(operacion);  
      }
    });
    this.presentToast("Sincronizando operaciones activas");
  }

  public sincronizarOperacion(operacion: Operacion) {
    if (operacion&&!operacion._id) {
      this.crearOperacion(operacion);
    } else if(operacion&&operacion._id) {
      this.actualizarOperacion(operacion);  
    }
    this.presentToast("Sincronizando operación activa");
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  private crearOperacion(operacion: Operacion) {
    this.operacionService.crearOperacion(operacion).subscribe((response:Operacion) => {
      this.cargarDatosOperacion(operacion, response);
    });
  }

  private actualizarOperacion(operacion: Operacion) {
    this.operacionService.actualizarOperacion(operacion).subscribe((response:Operacion) => {
      this.cargarDatosOperacion(operacion, response);
    });
  }

  private cargarDatosOperacion(operacion: Operacion, response: Operacion) {
    if (response&&response._id) {
      if (operacion.reportes&&operacion.reportes.length>0) {
        this.reporteService.agregarReportes(operacion.reportes, response);
      }
      if (operacion.estados&&operacion.estados.length>0) {
        this.estadoService.agregarEstados(operacion.estados, response);
      }
      if (operacion.mensajes&&operacion.mensajes.length>0) {
        this.mensajeService.agregarMensajes(operacion.mensajes, response);
      }
      if (operacion.recorridos&&operacion.recorridos.length>0) {
        this.recorridoService.agregarRecorridos(operacion.recorridos, response);
      }
      this.operacionService.obtenerFullOperacion(response._id).subscribe((o:Operacion)=> {
        this.operacionService.editarOperacion(o);
      });
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.obtenerOperaciones();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  buscar(texto) {
    this.filter.filter = texto;
    this.obtenerOperaciones();
    console.log(this.filter);
  }

  async opcionesOperacionActiva(ev: any, operacion: Operacion) {
    const popover = await this.popoverController.create({
      component: OpcionesOperacionActivaComponent,
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
      } else if(opcionId=='editar') {
        this.formularioOperacion(operacion);
      } else if(opcionId=='detalles') {
        this.verOperacion(operacion);
      } else if(opcionId=='reportar') {
        this.modalRecorrido(operacion);
      } else if(opcionId=='sincronizar') {
        this.sincronizarOperacion(operacion);
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
            this.eliminarOperacion(operacion);
          }
        }
      ]
    });
    await alert.present();
  }

}
