import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
/*
import { GeoService, PositionService } from '@core/services';

import { StorageService } from '@core/services';

import { Patrulla, Recorrido, Posicion } from '@models/patrulla';

import { Coordenada } from '@models/geo';

import { Subscription} from 'rxjs';
*/
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit, OnDestroy, AfterViewInit {
/*
  patrullas: Patrulla[];
  selectedPatrulla: Patrulla = null as any;
  recorrido: Recorrido = null as any;

  coordenadaActual: Coordenada = null as any;
  posicionSubscription!: Subscription;
*/
  constructor(
 /*   public geo: GeoService,
    public position: PositionService,
    private storage: StorageService*/
  ) {
    //this.storage.init().then(()=>this.obtenerPatrullas());
  }

  ngOnInit() {
    //this.obtenerPosicionActual();
    //this.suscripcionPosicion();
  }

  ngOnDestroy() {
   // this.posicionSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    //this.geo.updateSize();
  }
/*
  private obtenerPatrullas() {
    this.storage.getByKey('patrullas').then(patrullas => {
      if (patrullas&&patrullas.length>0) {
        this.patrullas = patrullas;
      }
    });
  }
  
  public alCambiarPatrulla() {
    console.log(this.selectedPatrulla);
  }

  private obtenerPosicionActual() {
    this.position.obtenerPosicionActual().then((coordenada: Coordenada) =>{
      this.geo.setView(14, [coordenada.longitud, coordenada.latitud]);
      this.geo.marcarPosicion(coordenada);
    });
  }

  public iniciarRecorrido() {
    this.posicionSubscription = this.position.observarPosicion().subscribe((coordenada: Coordenada) => {
      this.coordenadaActual = coordenada;
      this.geo.setView(14, [coordenada.longitud, coordenada.latitud]);
      this.geo.marcarPosicion(coordenada);
      this.geo.marcarRuta(coordenada);
      // Datos
      let posicion: Posicion = new Posicion();
      posicion.coordenada = coordenada;
      this.recorrido = this.recorrido?this.recorrido:new Recorrido();
      this.recorrido.posiciones.push(posicion);
    });
  }

  public terminarRecorrido() {
    let coordenada = this.coordenadaActual;
    this.geo.marcarPosicionFinal(coordenada);
    this.posicionSubscription.unsubscribe();
    // Datos
    this.selectedPatrulla.recorridos.push(this.recorrido);
    this.guardaRecorrido();
  }

  private guardaRecorrido() {
    this.storage.getByKey('patrullas').then(patrullas => {
      patrullas.forEach((p, index)  => {
        if (p.nombre==this.selectedPatrulla.nombre) {
          patrullas.splice(index, 1);
        }
      });
      patrullas.push(this.selectedPatrulla);
      this.storage.set('patrullas', patrullas);
      this.inicializar();
    });
  }

  private inicializar() {
    this.selectedPatrulla = null as any;
    this.recorrido = null as any;
    this.coordenadaActual = null as any;
    this.geo.inicializar();
  }
*/
}
