import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Operacion, Estado } from '@models/operacion';
import { Mensaje, Reporte, EstadoMensaje } from '@models/comunicacion';
import { FormularioReporteComponent } from '@shared/components';

import { FechaService } from '@core/services';

@Component({
  selector: 'ver-mensajes',
  templateUrl: './ver-mensajes.component.html',
  styleUrls: ['./ver-mensajes.component.scss'],
})
export class VerMensajesComponent implements OnInit {

  @Input('operacion') operacion: Operacion;

  constructor(
    private modalController: ModalController,
    public fechaService: FechaService
  ) {
  }

  ngOnInit() {
    if (this.operacion) {
      this.addEstadosAsMensajes();
    }
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
      //console.log(response);
    });
  }

  public usuarioEnvia(mensaje) {
    if (mensaje&&mensaje.user&&mensaje.user._id&&mensaje.texto) {
      if (mensaje.user._id=='ReemplazarPORsesionId'&&!this.esReporte(mensaje)) {
        return true;
      }
    }
    return false;
  }

  public esReporte(mensaje: Mensaje) {
    if (mensaje&&mensaje.texto&&mensaje.texto.includes('Reporte:')) {
      return true;
    }
    return false;
  }

  public esEstado(mensaje: Mensaje) {
    if (mensaje&&mensaje.estado&&mensaje.estado.includes(EstadoMensaje.ESTADO)) {
      return true;
    }
    return false;
  }

  public addEstadosAsMensajes() {
    if (this.operacion&&this.operacion.estados&&this.operacion.estados.length>0) {
      this.operacion.estados.forEach((estado: Estado) => {
        let mensaje = new Mensaje();
        mensaje.user = estado.user;
        mensaje.texto = `${estado.tipo}`;
        mensaje.estado = EstadoMensaje.ESTADO;
        mensaje.timestamp = estado.timestamp;
        mensaje.operacion = estado.operacion;
        this.operacion.mensajes.push(mensaje);
      });
      this.operacion.mensajes.sort((a,b) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0));
    }
  }
  
}
