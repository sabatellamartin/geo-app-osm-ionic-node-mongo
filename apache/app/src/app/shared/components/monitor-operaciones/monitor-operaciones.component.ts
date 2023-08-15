import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ModalController, ToastController, IonInfiniteScroll } from '@ionic/angular';

import { VerOperacionComponent } from '@shared/components';

import { Filter, Pager } from '@models/util';
import { Operacion, Recorrido, Posicion  } from '@models/operacion';
import { Coordenada  } from '@models/geo';
import { OperacionService, GeoService, PositionService } from '@core/services';

import { Subscription } from 'rxjs';

@Component({
  selector: 'monitor-operaciones',
  templateUrl: 'monitor-operaciones.component.html',
  styleUrls: ['monitor-operaciones.component.scss']
})
export class MonitorOperacionesComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  filtro: Filter = new Filter();
  pager: Pager = new Pager();
  operaciones: Operacion[] = new Array<Operacion>();

  osmMap: boolean = true;

  constructor(
    public geo: GeoService,
    public positionService: PositionService,
    private operacionService: OperacionService,
    private modalController: ModalController,
    public toastController: ToastController) {}

  ngOnInit() {

    this.geo.inicializar();
    setTimeout(() => {
      this.geo.map.updateSize();
    }, 500); // Refresca para que se vea el mapa
    
    this.filtro.fields = "estado";
    this.filtro.filter = "Iniciada";
    this.filtro.sort = "timestamp";
    this.filtro.limit = 1000;
    this.filtro.page = 1;
    this.obtenerOperaciones();
  }

  ngOnDestroy() {}

  ngAfterViewInit() {
    this.geo.updateSize();
  }

  private obtenerOperaciones() { //crear servicio que solo lite las oeraciones activas
    this.operacionService.obtenerOperaciones(this.filtro).subscribe((response: Pager) => {
      if (response&&response.docs&&response.docs.length>0) {
        this.pager = response;
        response.docs.forEach(element => {
            console.log(element);
            this.operaciones.push(element as Operacion);
            this.marcarRecorrido(element as Operacion)
        });
      }
    });
  }

  buscar(texto) {
    console.log(texto);
  }

  doRefresh(event) {
    this.operaciones = [];
    this.filtro.page = 1;
    this.obtenerOperaciones();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
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


  private marcarRecorrido(operacion: Operacion) {
    if(operacion&&operacion.recorridos&&operacion.recorridos.length>0) {
      operacion.recorridos.forEach((recorrido: Recorrido) => {
        if (recorrido&&recorrido.posiciones&&recorrido.posiciones.length>0) {
          recorrido.posiciones.forEach((posicion: Posicion) => {
            if (posicion&&posicion.coordenada) {
              let coord = new Coordenada();
              coord.longitud = posicion.coordenada.longitud;
              coord.latitud = posicion.coordenada.latitud;
              this.geo.setView(14, [coord.longitud, coord.latitud]);
              this.geo.marcarPosicion(coord, posicion.timestamp, '');
              this.geo.marcarRuta(coord, posicion.timestamp, '');
            }
          });
        }
      });
    }
  }

  /*
  public async contactoOperacion(operacion: Operacion) {
    const modal = await this.modalController.create({
      component: ContactoOperacionComponent,
      cssClass: 'lg-modal-class',
      componentProps: {
        'operacion': operacion
      },
      animated: true
    });
    await modal.present();
    modal.onDidDismiss().then(response => {
    });
  }*/
  
  alCambiarMapa() {
    this.osmMap = !this.osmMap;
    if (this.osmMap) {
      this.geo.setSource('osm');
    } else {
      this.geo.setSource('stamen');
    }
  }

}