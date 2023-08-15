import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { Operacion, TipoEstado } from '@models/operacion';

import { 
  OperacionService,
  EstadoService
} from '@core/services';

@Component({
  selector: 'formulario-operacion',
  templateUrl: './formulario-operacion.component.html',
  styleUrls: ['./formulario-operacion.component.scss'],
})
export class FormularioOperacionComponent implements OnInit, OnDestroy {

  @Input('operacion') operacion: Operacion;
  
  tipos: Array<string> = [];
  estados: Array<string> = [];
  
  constructor(
    private estadoService: EstadoService,
    private operacionService: OperacionService,
    private modalCtrl: ModalController,
    public toastController: ToastController) {}

  ngOnInit() {
    this.tipos = this.operacionService.obtenerTipos();
    if (!this.operacion.tipo) {
      this.operacion.tipo = this.tipos[0];
    }
    //this.estados = this.operacionService.obtenerEstados();
    if (this.operacion&&this.operacion.estados&&this.operacion.estados.length==0) {
      this.operacion = this.estadoService.cambiarEstado(this.operacion, TipoEstado.CREADA);
    }
    if (!this.operacion.imagen) {
      this.operacion.imagen = '../../assets/soldadoUy.jpg';
    }
  }

  ngOnDestroy() {}

  public guardar() {
    this.operacion;
    if (!this.operacion) {
      this.presentToast('No se puede guardar la operacion');
      return;
    }
    if (!this.operacion.nombre) {
      this.presentToast('Escriba un nombre antes de guardar');
      return;
    }
    if (!this.operacion.tipo) {
      this.presentToast('Seleccione un tipo antes de guardar');
      return;
    }
    if (!this.operacion.oficiales||this.operacion.oficiales<0) {
      this.operacion.oficiales = 0;
    }
    if (!this.operacion.subalternos||this.operacion.subalternos<0) {
      this.operacion.subalternos = 0;
    }
    if (!this.operacion.vehiculos||this.operacion.vehiculos<0) {
      this.operacion.vehiculos = 0;
    }
    this.operacionService.editarOperacion(this.operacion);
    this.cancelar();
  }

  public alCambiarTipo() {
    console.log(this.operacion);
  }

  async cancelar() {
    await this.modalCtrl.dismiss({
      'dismissed': true
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
