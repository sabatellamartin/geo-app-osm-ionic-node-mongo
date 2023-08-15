import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

import { ModalController, ToastController } from '@ionic/angular';

import { FormularioOrganismoComponent } from './formulario-organismo/formulario-organismo.component';

import { OrganismoService } from '@core/services';
import { TipoOrganismoService } from '@core/services';

import { Organismo } from '@models/organismo';
import { TipoOrganismo } from '@models/organismo';
import { Filter, Pager } from '@models/util';

@Component({
  selector: 'admin-organismos',
  templateUrl: 'organismos.page.html',
  styleUrls: ['organismos.page.scss']
})
export class OrganismosPage implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  selectedOrganismo: Organismo = null as Organismo;
  organismos: Organismo[] = new Array<Organismo>();
  tiposOrganismos: TipoOrganismo[] = new Array<TipoOrganismo>();
  filter: Filter = new Filter();
  pager: Pager = new Pager();

  constructor(
    private organismoService: OrganismoService,
    private tipoOrganismoService: TipoOrganismoService,
    private modalController: ModalController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.filter.filter = "";
    this.filter.fields = "nombre,acronimo";
    this.filter.sort = "nombre";
    this.filter.order = 1;
    this.filter.limit = 12;
    this.obtenerOrganismos();
  }

  ngOnDestroy() {}

  private async obtenerOrganismos() {
    this.tiposOrganismos = await this.tipoOrganismoService.obtenerAllTiposOrganismos().toPromise();
    this.organismoService.obtenerOrganismos(this.filter).subscribe((response: Pager) => {
      if (response&&response.docs&&response.docs.length>0) {
        this.pager = response;
        response.docs.forEach((organismo: Organismo) => {
          organismo.tipoOrganismo = this.tiposOrganismos.find((t:TipoOrganismo) => organismo.tipoOrganismo?organismo.tipoOrganismo.toString()===t._id:false) as TipoOrganismo;
          this.organismos.push(organismo);
        });
      }
    });
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      if (this.pager.hasNextPage) {
        // Mientras existan paginas
        this.filter.page = this.filter.page+1;
        this.obtenerOrganismos();
      } else {
        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    console.log("toggleScroll disabled: "+this.infiniteScroll.disabled);
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.organismos = [];
      this.filter.page = 1;
      this.obtenerOrganismos();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  editar(organismo: Organismo) {
    this.selectedOrganismo = organismo;
    this.formularioOrganismo(organismo);
  }

  agregar() {
    let organismo = new Organismo();
    this.selectedOrganismo = organismo;
    this.formularioOrganismo(organismo);
  }

  private async formularioOrganismo(organismo: Organismo) {
    const modal = await this.modalController.create({
      component: FormularioOrganismoComponent,
      componentProps: {
        'organismo': organismo
      },
      animated: true
    });
    await modal.present();
    modal.onDidDismiss().then(response => {
      this.filter = new Filter();
      this.obtenerOrganismos();
    });
  }

  buscar(texto) {
    this.filter.filter = texto;
    console.log(this.filter);
    this.organismos = [];
    this.filter.page = 1;
    this.obtenerOrganismos();
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}