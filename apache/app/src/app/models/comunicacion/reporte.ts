import { Operacion } from '../operacion';
import { User } from '../usuario';

export class Reporte {
  _id: string;
  detalle: string;
  timestamp: number;
  operacion: Operacion;
  user: User;
  constructor() {
    this._id = null as any;
    this.timestamp = (new Date()).getTime();
  }
}
