import { Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChild } from '@angular/core';
import { ModalController, PopoverController, IonContent, IonInput, ToastController} from '@ionic/angular';

import { GeoService, PositionService, OperacionService, EstadoService } from '@core/services';

import { Operacion, Recorrido, Posicion, TipoEstado, Estado } from '@models/operacion';
import { Coordenada } from '@models/geo';
import { Mensaje } from '@models/comunicacion';
import { User } from '@models/usuario';

import { Subscription } from 'rxjs';

import { OpcionesRecorridoComponent } from './opciones-recorrido/opciones-recorrido.component';
import { CapturaComponent } from '../captura/captura.component';

@Component({
  selector: 'recorrido',
  templateUrl: './recorrido.component.html',
  styleUrls: ['./recorrido.component.scss'],
})
export class RecorridoComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input('operacion') operacion: Operacion;

  recorrido: Recorrido = null as any;

  coordenadaActual: Coordenada = null as any;
  posicionSubscription!: Subscription;

  texto: string = "";
  @ViewChild('content', {static: false}) content: IonContent;
  @ViewChild('textoInput', {static: false})  textoInput: IonInput;

  constructor(
    public geo: GeoService,
    public position: PositionService,
    private operacionService: OperacionService,
    private estadoService: EstadoService,
    private modalCtrl: ModalController,
    private popoverController: PopoverController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.geo.inicializar();
  
    setTimeout(() => {
      this.geo.map.updateSize();
    }, 500); // Refresca para que se vea el mapa
    
    this.obtenerPosicionActual();
    
    let estado: Estado = this.estadoService.obtenerEstadoActual(this.operacion);
    
    if (estado&&estado.tipo
      &&estado.tipo!=TipoEstado.FINALIZADA
      &&estado.tipo!=TipoEstado.SUSPENDIDA) {
      this.operacion = this.estadoService.cambiarEstado(this.operacion, TipoEstado.ACTIVA);
      this.iniciarRecorrido();
    } else {
      this.presentToast("Esta operación ha terminado");
      this.cancelar();
    }
  }

  ngOnDestroy() {
    if (this.posicionSubscription) {
      this.posicionSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.geo.updateSize();
  }

  async cancelar() {
    await this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  private obtenerPosicionActual() {
    this.position.obtenerPosicionActual().then((coordenada: Coordenada) =>{
      this.geo.setView(14, [coordenada.longitud, coordenada.latitud]);
      this.geo.marcarPosicion(coordenada, new Date().getTime(), '');
    });
  }

  public iniciarRecorrido() {
    this.posicionSubscription = this.position.observarPosicion().subscribe((coordenada: Coordenada) => {
      this.coordenadaActual = coordenada;
      this.geo.setView(14, [coordenada.longitud, coordenada.latitud]);
      this.geo.marcarPosicion(coordenada, new Date().getTime(), 'Inicio');
      this.geo.marcarRuta(coordenada, new Date().getTime(), '');
      // Datos
      let posicion: Posicion = new Posicion();
      posicion.coordenada = coordenada;
      this.recorrido = this.recorrido?this.recorrido:new Recorrido();
      this.recorrido.posiciones.push(posicion);
    });
  }

  public terminarRecorrido() {
    let coordenada = this.coordenadaActual;
    this.geo.marcarPosicionFinal(coordenada, new Date().getTime(), 'Fin');
    if (this.posicionSubscription) {
      this.posicionSubscription.unsubscribe();
    }
    // Guardar
    this.guardaRecorrido(this.recorrido);
  }

  private guardaRecorrido(recorrido: Recorrido) {
    this.operacion.recorridos.push(recorrido);
    this.operacionService.editarOperacion(this.operacion);
    this.inicializar();
  }

  private inicializar() {
    this.recorrido = null as any;
    this.coordenadaActual = null as any;
    this.geo.inicializar();
  }


  async opcionesRecorrido(ev: any) {
    const popover = await this.popoverController.create({
      component: OpcionesRecorridoComponent,
      event: ev, // Captura evento para determinar la posicion del popover
      translucent: true,
      componentProps:  { operacion: this.operacion }, // Pasa parametros
      animated: true,
      showBackdrop: true,
      backdropDismiss: true, // false: No se cierra si no tiene interaccion en el popover
      mode: "ios" // Activa el modo de visualizacion de ios
    });
    await popover.present();
    popover.onDidDismiss().then(response => {
      let opcionId = response.data as string;
      if(opcionId=='pausar') {
        this.operacion = this.estadoService.cambiarEstado(this.operacion, TipoEstado.PAUSA);
        this.terminarRecorrido();
      } else if(opcionId=='finalizar') {
        this.operacion = this.estadoService.cambiarEstado(this.operacion, TipoEstado.FINALIZADA);
        this.terminarRecorrido();
      } else if(opcionId=='posicionar') {
        this.obtenerPosicionActual();
      }
    });
  }

  enviarMensaje() {
    if (!this.texto||this.texto=="") {
      return;
    }
    let mensaje: Mensaje = new Mensaje();  
    mensaje.texto = this.texto;
    mensaje.timestamp = (new Date()).getTime();
    
    /*PISADA PARA SIMULAR EMISOR Y RECEPTOR*/
    if (this.texto.includes("2")) {
      mensaje.user = new User();
      mensaje.user._id = "5aa1c2c35ef7a4e97b5e995d";
    } else {
      mensaje.user = new User();
      mensaje.user._id = "5aa1c2c35ef7a4e97b5e995c";
    }
    this.texto="";
    this.operacion.mensajes = !this.operacion.mensajes?new Array<Mensaje>():this.operacion.mensajes;
    this.operacion.mensajes.push(mensaje);
    this.operacionService.editarOperacion(this.operacion);
    this.focoEnTexto();
    this.scrollToBottom();
  }

  private focoEnTexto() {
    this.textoInput.setFocus();
  }

  private scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 10);
  }


  /*CAPTURA*/
  async capturar() {
    const modal = await this.modalCtrl.create({
      component: CapturaComponent,
      componentProps: {
        'operacion': this.operacion
      },
      animated: true
    });
    await modal.present();
    modal.onDidDismiss().then(response => {
      console.log(response);
    });
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
