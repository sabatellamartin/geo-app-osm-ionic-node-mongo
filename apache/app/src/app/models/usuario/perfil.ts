import { Organismo } from '../organismo';

export class Perfil {
  role: string;
  verified: boolean;
  name: string;
  email: string;
  verification: string;
  city: string;
  country: string;
  phone: string;
  imei: string;
  urlTwitter: string;
  urlGitHub: string;
  fuerza: Organismo;
  division: Organismo;
  brigada: Organismo;
  unidad: Organismo;
  constructor () {
  }
}