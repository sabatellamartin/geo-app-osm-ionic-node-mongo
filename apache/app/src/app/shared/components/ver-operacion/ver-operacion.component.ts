import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Operacion, Recorrido, Posicion } from '@models/operacion';
import { Coordenada } from '@models/geo';
import { User } from '@models/usuario';

import { GeoService, OperacionService, UsuarioService } from '@core/services';

@Component({
  selector: 'ver-operacion',
  templateUrl: './ver-operacion.component.html',
  styleUrls: ['./ver-operacion.component.scss'],
})
export class VerOperacionComponent implements OnInit, OnDestroy {

  @Input('operacion') operacion: Operacion;
  usuario: User;
  osmMap: boolean = true;
  isFullOperacion: boolean = false;

  constructor(
    public geo: GeoService,
    private operacionService: OperacionService,
    private usuarioService: UsuarioService,
    private modalCtrl: ModalController) {
    this.geo.inicializar();
    setTimeout(() => {
      this.geo.map.updateSize();
    }, 500); // Refresca para que se vea el mapa
  }

  ngOnInit() {
    if (this.operacion&&this.operacion.user&&this.operacion.user._id) {
      this.usuarioService.obtenerFullUsuario(this.operacion.user._id.toString()).subscribe((usuario:User)=> {
        this.usuario = usuario;
      });
    }
    if (this.operacion&&this.operacion._id) {
      this.operacionService.obtenerFullOperacion(this.operacion._id).subscribe((o:Operacion)=> {
        this.operacion = o;
        this.isFullOperacion = true;
        this.marcarRecorrido();
      });
    }
  }

  ngOnDestroy() {}

  ngAfterViewInit() {
    this.geo.updateSize();
  }

  private marcarRecorrido() {
    if(this.operacion&&this.operacion.recorridos&&this.operacion.recorridos.length>0) {
      this.operacion.recorridos.forEach((recorrido: Recorrido) => {
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

  async cancelar() {
    await this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  alCambiarMapa() {
    this.osmMap = !this.osmMap;
    if (this.osmMap) {
      this.geo.setSource('osm');
    } else {
      this.geo.setSource('stamen');
    }
  }

}