import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { Organismo } from '@models/organismo';
import { TipoOrganismo } from '@models/organismo';
import { OrganismoService } from '@core/services';
import { TipoOrganismoService } from '@core/services';

@Component({
  selector: 'formulario-organismo',
  templateUrl: './formulario-organismo.component.html',
  styleUrls: ['./formulario-organismo.component.scss'],
})
export class FormularioOrganismoComponent implements OnInit, OnDestroy {

  @Input('organismo') organismo: Organismo;
  tiposOrganismos: TipoOrganismo[] = new Array<TipoOrganismo>();
  organismos: Organismo[] = new Array<Organismo>();
  selectedOrganismos: Organismo[] = new Array<Organismo>();

  constructor(
    private tipoOrganismoService: TipoOrganismoService,
    private organismoService: OrganismoService,
    private modalCtrl: ModalController,
    public toastController: ToastController) {
  }

  ngOnInit() {
    this.obtenerFullOrganismo();
    this.obtenerAllTiposOrganismos();
    this.obtenerAllOrganismos();
    if (!this.organismo) {
      this.organismo = new Organismo();
      this.presentToast('Organismo nuevo');
    }
  }

  ngOnDestroy() {}

  private async obtenerFullOrganismo() {
    if (this.organismo._id) {
      const promise = this.organismoService.obtenerFullOrganismo(this.organismo._id).toPromise();
      this.organismo = await Promise.resolve(promise);
    }
  }

  private async obtenerAllTiposOrganismos() {
    const promise = this.tipoOrganismoService.obtenerAllTiposOrganismos().toPromise();
    this.tiposOrganismos = await Promise.resolve(promise);
  }

  private async obtenerAllOrganismos() {
    const promise = this.organismoService.obtenerAllOrganismos().toPromise();
    const response = await Promise.resolve(promise);
    response.forEach((organismo: Organismo) => {
      organismo.tipoOrganismo = this.tiposOrganismos.find((t:TipoOrganismo) => organismo.tipoOrganismo?organismo.tipoOrganismo.toString()===t._id:false) as TipoOrganismo;
      this.organismos.push(organismo);
    });
    this.seleccionarOrganismosPorNivel(1);
  }

  private seleccionarOrganismosPorNivel(nivel: number) {
    if (this.organismo&&this.organismo.tipoOrganismo&&this.organismo.tipoOrganismo.nivel&&this.organismo.tipoOrganismo.nivel>1) {
      nivel = this.organismo.tipoOrganismo.nivel-1;
    }
    this.selectedOrganismos = this.organismos.filter((o: Organismo) => o.tipoOrganismo.nivel===nivel);
  }

  compareFn(o1: any, o2: any) {
    return o1 && o2 ? o1._id === o2._id : o1 === o2;
  }

  public alCambiarTipoOrganismo() {
    if (this.organismo.tipoOrganismo&&this.organismo.tipoOrganismo.nivel) {
      this.seleccionarOrganismosPorNivel(this.organismo.tipoOrganismo.nivel);
    }
  }

  public alCambiarOrganismo() {
    console.log(this.organismo.organismo);
  }

  public guardar() {
    let organismo: Organismo = this.organismo;
    if (!organismo) {
      this.presentToast('No se puede guardar el organismo');
      return;
    }
    if (!organismo.tipoOrganismo) {
      this.presentToast('Seleccione el tipo de organismo antes de guardar');
      return;
    }
    if (organismo._id) {
      this.organismoService.actualizarOrganismo(organismo).subscribe((response:any) => {
        if(response) {
          this.cancelar('Organismo creado');
        }
      });
    } else {
      this.organismoService.crearOrganismo(organismo).subscribe((response:any)=> {
        if(response) {
          this.cancelar('Organismo actualizado');
        }
      });
    }
  }

  async cancelar(mensaje: string) {
    if (mensaje&&mensaje!='') {
      this.presentToast(mensaje);
    }
    await this.modalCtrl.dismiss({
      'organismo': this.organismo,
      'mensaje': mensaje
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
