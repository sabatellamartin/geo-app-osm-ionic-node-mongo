import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { Operacion } from '@models/operacion';
import { Reporte, Mensaje } from '@models/comunicacion';
import { User } from '@models/usuario';
import { OperacionService } from '@core/services';

@Component({
  selector: 'formulario-reporte',
  templateUrl: './formulario-reporte.component.html',
  styleUrls: ['./formulario-reporte.component.scss'],
})
export class FormularioReporteComponent implements OnInit, OnDestroy {

  @Input('operacion') operacion: Operacion;
  @Input('reporte') reporte: Reporte;
  
  constructor(
    private operacionService: OperacionService,
    private modalCtrl: ModalController,
    public toastController: ToastController) {}

  ngOnInit() {
    if (!this.operacion||!this.reporte) {
      this.cancelar();
    }
  }

  ngOnDestroy() {}

  public guardar() {
    let reporte: Reporte = this.reporte;
    if (!reporte) {
      this.presentToast('No se puede guardar el reporte');
      return;
    }
    if (!reporte.detalle) {
      this.presentToast('Escriba el detalle del reporte antes de guardar');
      return;
    }
    // Si no existe reporte lo creo
    this.operacion.reportes = !this.operacion.reportes?new Array<Reporte>():this.operacion.reportes;
    // Pisar reporte preexistente
    this.operacion.reportes.forEach((r, index)  => {
      if (r.timestamp==reporte.timestamp) {
        this.operacion.reportes.splice(index, 1);
      }
    });
    this.operacion.reportes.push(reporte);
    /* Mensaje registro de reporte */
    let mensaje: Mensaje = new Mensaje();
    mensaje.user = new User();
    mensaje.user._id = "5aa1c2c35ef7a4e97b5e995d"; // provisorio
    mensaje.texto = "Reporte:"+reporte.timestamp;
    mensaje.timestamp = (new Date()).getTime();
    // Si no existe mensajes lo creo
    this.operacion.mensajes = !this.operacion.mensajes?new Array<Mensaje>():this.operacion.mensajes;
    this.operacion.mensajes.push(mensaje);
    // Persisto operacion con datos
    this.operacionService.editarOperacion(this.operacion);
    this.cancelar();
  }

  async cancelar() {
    await this.modalCtrl.dismiss({
      'reporte': this.reporte
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
