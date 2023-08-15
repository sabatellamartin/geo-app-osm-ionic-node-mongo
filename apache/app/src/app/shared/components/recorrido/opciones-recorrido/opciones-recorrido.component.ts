import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, ModalController/*, AlertController */ } from '@ionic/angular';

import { Operacion } from '@models/operacion';
import { FormularioOperacionComponent } from '@shared/components';

import { Reporte } from '@models/comunicacion';
import { FormularioReporteComponent } from '@shared/components';

@Component({
  selector: 'opciones-recorrido',
  templateUrl: './opciones-recorrido.component.html',
  styleUrls: ['./opciones-recorrido.component.scss'],
})
export class OpcionesRecorridoComponent implements OnInit {

  @Input('operacion') operacion: Operacion;

  opciones: any = [];

  selectedOpcion = null as any;

  constructor(
    private modalController: ModalController,
    //private alertController: AlertController,
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
        id: 'pausar',
        descripcion: 'Pausar',
      },
      {
        id: 'finalizar',
        descripcion: 'Finalizar'
      },
      {
        id: 'posicionar',
        descripcion: 'Posicionar'
      },
      {
        id: 'reportar',
        descripcion: 'Reportar'
      },
      {
        id: 'editar',
        descripcion: 'Editar'
      }
    ];
  }

  public seleccionOpcion(opcionId: string) {
    this.selectedOpcion = opcionId;
    if(opcionId=='pausar') {
      this.cerrar();
      //this.editarPublicacion(this.publicacion);
    } else if(opcionId=='finalizar') {
      this.cerrar();
      //this.resolverPublicacion(this.publicacion);
    } else if(opcionId=='posicionar') {
      this.cerrar();
      //this.eliminarPublicacion(this.publicacion);
    } else if(opcionId=='reportar') {
      this.formularioReporte(this.operacion);
    } else if(opcionId=='editar') {
      this.formularioOperacion(this.operacion);
    }
  }

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
  }


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
