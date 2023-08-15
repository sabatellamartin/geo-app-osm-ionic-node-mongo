import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env';

import { Mensaje } from '@models/comunicacion';
import { Operacion } from '@models/operacion';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(
    private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return error;
    };
  }

  public agregarMensajes(mensajes: Mensaje[], operacion: Operacion): any {
    if (mensajes&&mensajes.length>0) {
      if (operacion&&operacion._id) {
        mensajes.forEach(async (mensaje:Mensaje) => {
          mensaje.operacion = operacion;
          mensaje.user = operacion.user;
          if (mensaje&&!mensaje._id) {
            await this.crearMensaje(mensaje).toPromise();/*.subscribe((response:Mensaje) => { console.log(response); });*/
            return true;
          } else if (mensaje&&mensaje._id) {
            await this.actualizarMensaje(mensaje).toPromise();/*.subscribe((response:Mensaje) => { console.log(response); });*/
            return true;
          }
        });
      }
    }
    return false;
  }

  public crearMensaje(mensaje: Mensaje): Observable<Mensaje> {
    const url = `${environment.apiUrl}/mensajes`;
    return this.http.post<Mensaje>(url, JSON.stringify(mensaje), this.httpOptions).pipe(
      map((mensaje: Mensaje) => {
        if (mensaje&&mensaje._id) {
          return mensaje;
        } 
        return null;
      }),
      catchError(this.handleError<Mensaje>('mensaje'))
    );
  }

  public actualizarMensaje(mensaje: Mensaje): Observable<Mensaje> {
    const url = `${environment.apiUrl}/mensajes/${mensaje._id}`;
    return this.http.patch<Mensaje>(url, JSON.stringify(mensaje), this.httpOptions).pipe(
      map((mensaje: Mensaje) => {
        if (mensaje&&mensaje._id) {
          return mensaje;
        }
        return null;
      }),
      catchError(this.handleError<Mensaje>('mensaje'))
    );
  }

}