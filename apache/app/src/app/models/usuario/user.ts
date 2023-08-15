import { Organismo } from '../organismo';

export class User {
  _id: string;
  password: string;
  phone: string;
  city: string;
  country: string;
  imei: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  verification: string;
  ultimoInicio: Date;
  fechaCreacion: Date;
  createdAt: number;
  updatedAt: number;
  refreshToken: string;
  fuerza: Organismo;
  division: Organismo;
  brigada: Organismo;
  unidad: Organismo;
  urlGitHub: string; // Provisorio avatar
  constructor () {
    this._id = null as any;
  }
}