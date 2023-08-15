import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

  constructor() {}

  public formatoAMPM(date) {
    date = new Date(date);
    let horas = date.getHours();
    let minutos = date.getMinutes();
    let ampm = horas>=12?'pm':'am';
    horas = horas%12;
    horas = horas?horas:12; // the hour '0' should be '12'
    minutos = minutos<10?'0'+minutos:minutos;
    return horas+':'+minutos+' '+ampm;
  }

  public formatoFecha(date) {
    date = new Date(date);
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear().toString().substr(-2);
    if(dd<10){dd='0'+dd;}
    if(mm<10){mm='0'+mm;}
    return dd+'/'+mm+'/'+yyyy;
  }

  public pasoHaceMasdeXHoras(timestamp: number, horas: number): boolean {
    let horasAtras: number = new Date().getTime() - (horas * 60 * 60 * 1000);
    if (timestamp < horasAtras) {
      return true;
    }
    return false;
  }

  public tiempoDesde(date: Date): string {
    moment.locale('es');
    return moment(date).fromNow();
  }

  public obtenerDias(): string[] {
    return ['Domingo', 'Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  }

  public obtenerNombreDiaHoy(): string {
    let weekDayName =  moment(new Date()).format('dddd');
    return weekDayName;
  }

}
