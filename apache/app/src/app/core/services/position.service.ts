import { Injectable } from '@angular/core';

import { Geolocation, Geoposition, PositionError, Coordinates } from '@ionic-native/geolocation/ngx';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Coordenada } from '@models/geo';

import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  latDefault: number = environment.latDefault;
  lonDefault: number = environment.lonDefault;

  constructor(private geolocation: Geolocation) {}

  public obtenerPosicionActual(): Promise<Coordenada|void> {
    return this.geolocation.getCurrentPosition().then((resp) => {
      let coordenada: Coordenada = new Coordenada();
      if (resp.coords) {
        coordenada.longitud = (resp.coords as Coordinates).longitude;
        coordenada.latitud = (resp.coords as Coordinates).latitude;
      } else {
        coordenada.latitud = this.latDefault;
        coordenada.longitud = this.lonDefault;
      }
      return coordenada;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  } 

  public observarPosicion(): Observable<Coordenada> {
    return this.geolocation.watchPosition().pipe(
      map((data: any) => {
        let coordenada: Coordenada = new Coordenada();
        if ((data as Geoposition).coords != undefined) {
          coordenada.longitud = (data as Geoposition).coords.longitude;
          coordenada.latitud = (data as Geoposition).coords.latitude;
          return coordenada;
        } else { 
          let positionError = (data as PositionError);
          console.log('Error ' + positionError.code + ': ' + positionError.message);
          coordenada.latitud = this.latDefault;
          coordenada.longitud = this.lonDefault;
          return coordenada;
        }
      }),
      catchError((e: any) => throwError(e))
    );
  }

}