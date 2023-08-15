import { Posicion } from '.';
import { Operacion } from '../operacion';

export class Recorrido {
  _id: string;
  posiciones: Posicion[];
  timestamp: number;
  operacion: Operacion;
  constructor () {
    this._id = null as any;
    this.posiciones = new Array<Posicion>();
    this.timestamp = (new Date()).getTime();
  }
}
