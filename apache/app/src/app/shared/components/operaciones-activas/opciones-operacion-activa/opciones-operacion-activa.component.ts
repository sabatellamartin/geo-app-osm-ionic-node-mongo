import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
/*
import { Operacion } from '@models/operacion';
import { FormularioOperacionComponent } from '@shared/components';

import { Reporte } from '@models/comunicacion';
import { FormularioReporteComponent } from '@shared/components';
*/
@Component({
  selector: 'opciones-operacion-activa',
  templateUrl: './opciones-operacion-activa.component.html',
  styleUrls: ['./opciones-operacion-activa.component.scss'],
})
export class OpcionesOperacionActivaComponent implements OnInit {

  //@Input('operacion') operacion: Operacion;

  opciones: any = [];

  selectedOpcion = null as any;

  constructor(
    private modalController: ModalController,
    private popoverCtrl: PopoverController) {
    this.obtenerOpciones();
  }

  ngOnInit() {}

  async cerrar() {
    await this.popoverCtrl.dismiss(this.selectedOpcion);
  }

  obtenerOpciones() {
    this.opciones = [
      {
        id: 'eliminar',
        descripcion: 'Eliminar',
      },
      {
        id: 'editar',
        descripcion: 'Editar',
      },
      {
        id: 'detalles',
        descripcion: 'Detalles'
      },
      {
        id: 'reportar',
        descripcion: 'Reportar'
      },
      {
        id: 'sincronizar',
        descripcion: 'Sincronizar'
      }
    ];
  }

  public seleccionOpcion(opcionId: string) {
    this.selectedOpcion = opcionId;
    this.cerrar();
    /*if(opcionId=='eliminar') {
      this.cerrar();
      //this.editarPublicacion(this.publicacion);
    } else if(opcionId=='detalles') {
      this.cerrar();
      //this.resolverPublicacion(this.publicacion);
    } else if(opcionId=='comunicar') {
      this.cerrar();
      //this.eliminarPublicacion(this.publicacion);
    } else if(opcionId=='reportar') {
      //this.formularioReporte(this.operacion);
    } else if(opcionId=='editar') {
      this.formularioOperacion(this.operacion);
    }*/
  }
/*
  private async formularioOperacion(operacion: Operacion) {
    const modal = await this.modalController.create({
      component: FormularioOperacionComponent,
      componentProps: {
        'operacion': operacion
      },
      animated: true
    });
    await modal.present();
    modal.onDidDismiss().then(response => {
      console.log(response);
      this.cerrar();
    });
  }

  private async formularioReporte(operacion: Operacion) {
    const modal = await this.modalController.create({
      component: FormularioReporteComponent,
      componentProps: {
        'operacion': operacion,
        'reporte': new Reporte()
      },
      animated: true
    });
    await modal.present();
    modal.onDidDismiss().then(response => {
      console.log(response);
      this.cerrar();
    });
  }*/


/*
  private async eliminarPublicacion(publicacion: Publicacion) {
    const alert = await this.alertController.create({
      header: '¿Eliminar publicación?',
      message: '¿Estás de acuerdo con eliminar la publicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.mensajeService.presentarMensaje("La publicación no fue eliminada.");
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.publicacionService.eliminarPublicacion(publicacion).then((res)=> {
              this.mensajeService.presentarMensaje("Publicación eliminada con éxito.");
            });
          }
        }
      ]
    });
    await alert.present();
  }
*/

}
