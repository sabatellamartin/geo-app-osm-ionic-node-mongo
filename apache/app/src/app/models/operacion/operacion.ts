import { Recorrido, Estado } from '.';
import { Mensaje, Reporte } from '../comunicacion';
import { User } from '../usuario';

export class Operacion {
  _id: string;
  nombre: string;
  tipo: string;
  oficiales: number;
  subalternos: number;
  vehiculos: number;
  recorridos: Recorrido[];
  mensajes: Mensaje[];
  reportes: Reporte[];
  imagen: string;
  estado: Estado;
  estados: Estado[];
  timestamp: number;
  user: User;
  constructor () {
    this._id = null as any;
    this.nombre = null as any;
    this.tipo = null as any;
    this.oficiales = 0;
    this.subalternos = 0;
    this.vehiculos = 0;
    this.imagen = null as any;
    this.estado = new Estado();
    this.estados = new Array<Estado>();
    this.recorridos = new Array<Recorrido>();
    this.mensajes = new Array<Mensaje>();
    this.reportes = new Array<Reporte>();
    this.timestamp = (new Date()).getTime();
    this.user = new User(); 
  }
}