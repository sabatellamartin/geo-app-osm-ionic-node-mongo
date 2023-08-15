import { Operacion } from '../operacion';
import { User } from '../usuario';
import { EstadoMensaje } from '.';

export class Mensaje {
  _id: string;
  user: User;
  texto: string;
  estado: EstadoMensaje;
  timestamp: number;
  operacion: Operacion;
  constructor() {
    this.estado = EstadoMensaje.LISTO;
    this.timestamp = (new Date()).getTime();
  }
}