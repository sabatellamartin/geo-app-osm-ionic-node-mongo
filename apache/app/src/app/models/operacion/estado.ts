import { Operacion } from '../operacion';
import { TipoEstado } from '.';
import { User } from '../usuario';

export class Estado {
  _id: string;
  tipo: TipoEstado;
  timestamp: number;
  operacion: Operacion;
  user: User;
  constructor () {
    this._id = null as any;
    this.tipo = TipoEstado.CREADA;
    this.timestamp = (new Date()).getTime(); 
  }
}
