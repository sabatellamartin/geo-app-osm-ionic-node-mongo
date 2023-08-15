import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Operacion } from '@models/operacion';
import { Mensaje, Reporte } from '@models/comunicacion';
import { FormularioReporteComponent } from '@shared/components';

import { FechaService } from '@core/services';

@Component({
  selector: 'mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss'],
})
export class MensajesComponent implements OnInit {

  @Input('operacion') operacion: Operacion;

  constructor(
    private modalController: ModalController,
    public fechaService: FechaService
  ) {}

  ngOnInit() {
    console.log(this.operacion.mensajes);
  }

  public verReporte(mensaje:Mensaje) {
    if (mensaje.texto.includes('Reporte:')) {
      let reporteTimestamp: string = mensaje.texto.replace('Reporte:','');
      this.operacion.reportes.forEach((r: Reporte) => {
        if (r.timestamp.toString()==reporteTimestamp) {
          this.formularioReporte(this.operacion, r);
        }
      });
    }
  }

  private async formularioReporte(operacion: Operacion, reporte: Reporte) {
    const modal = await this.modalController.create({
      component: FormularioReporteComponent,
      componentProps: {
        'operacion': operacion,
        'reporte': reporte
      },
      animated: true
    });
    await modal.present();
    modal.onDidDismiss().then(response => {
      console.log(response);
    });
  }

}
