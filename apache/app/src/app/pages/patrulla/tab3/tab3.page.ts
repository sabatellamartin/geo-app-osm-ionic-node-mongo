import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { GeoService, PositionService } from '@core/services';

import { Coordenada } from '@models/geo';

import { Subscription} from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy, AfterViewInit {

  coordenadaInicial: Coordenada = null as any;
  coordenadaActual: Coordenada = null as any;
  posicionSubscription!: Subscription;

  constructor(
    public geo: GeoService,
    public position: PositionService
  ) {}

  ngOnInit() {
    this.obtenerPosicionActual();
    this.suscripcionPosicion();
  }

  ngOnDestroy() {
    this.posicionSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.geo.updateSize();
  }

  private obtenerPosicionActual() {
    this.position.obtenerPosicionActual().then((coordenada: Coordenada) =>{
      this.coordenadaInicial = coordenada;
      this.geo.setView(14, [this.coordenadaInicial.longitud, this.coordenadaInicial.latitud]);
    });
  }

  private suscripcionPosicion() {
    this.posicionSubscription = this.position.observarPosicion().subscribe((coordenada: Coordenada) => {
      this.coordenadaActual = coordenada;
      //console.log(coordenada);
      this.geo.marcarPosicion(coordenada, new Date().getTime(), '');
      this.geo.setView(14, [coordenada.longitud, coordenada.latitud]);
    });
  }

  locate() {
    if (this.coordenadaActual) {
      this.geo.marcarRuta(this.coordenadaActual, new Date().getTime(), '');
      let coordenada = this.coordenadaActual;
      coordenada.longitud+=0.03;
      coordenada.latitud+=0.05;
      this.geo.marcarRuta(coordenada, new Date().getTime(), '');
      coordenada.longitud+=0.04;
      coordenada.latitud+=0.02;
      this.geo.marcarRuta(coordenada, new Date().getTime(), '');
      this.geo.setView(14, [coordenada.longitud, coordenada.latitud]);
      this.geo.marcarPosicion(coordenada, new Date().getTime(), '');
    }
  }

  terminarRecorrido() {
    let coordenada = this.coordenadaActual;
    coordenada.longitud+=0.03;
    coordenada.latitud+=0.05;
    this.geo.marcarPosicionFinal(coordenada, new Date().getTime(), 'Fin');
    this.posicionSubscription.unsubscribe();
  }

}
