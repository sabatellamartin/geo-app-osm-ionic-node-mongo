import { TipoOrganismo } from '.';

export class Organismo {
  _id: string;
  organismo: Organismo;
  codigo: string;
  nombre: string;
  acronimo: string;
  abreviacion: string;
  tipoOrganismo: TipoOrganismo;
  createdAt: Date;
  updatedAt: Date;
  constructor () {
    this._id = null as any;
    this.organismo = null as Organismo;
  }
}