import { Coordenada } from '../geo';

export class Posicion {
  coordenada: Coordenada;
  timestamp: number;
  constructor() {
    this.coordenada = null as any;
    this.timestamp = (new Date()).getTime();
  }
}