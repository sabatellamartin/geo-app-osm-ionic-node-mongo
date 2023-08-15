import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env';

import { Operacion, Estado, TipoEstado} from '@models/operacion';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

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

  public cambiarEstado(operacion: Operacion, tipo: TipoEstado): Operacion {
    let estado = new Estado();
    estado.tipo = tipo;
    estado.timestamp = (new Date()).getTime();
    operacion.estados.push(estado);
    return operacion;
  }

  public obtenerEstadoActual(operacion: Operacion): Estado {
    let estado: Estado = null as any;
    if (operacion.estados&&operacion.estados.length>0) {
      estado = operacion.estados.reduce((max, estado) => max.timestamp > estado.timestamp ? max : estado);
    }
    return estado;
  }

  public agregarEstados(estados: Estado[], operacion: Operacion): any {
    if (estados&&estados.length>0) {
      if (operacion&&operacion._id) {
        estados.forEach(async (estado:Estado) => {
          estado.operacion = operacion;
          estado.user = operacion.user;
          if (estado&&!estado._id) {
            await this.crearEstado(estado).toPromise();/*.subscribe((response:Reporte) => { console.log(response); });*/
            return true;
          } else if (estado&&estado._id) {
            await this.actualizarEstado(estado).toPromise();/*.subscribe((response:Reporte) => { console.log(response); });*/
            return true;
          }
        });
      }
    }
    return false;
  }

  public crearEstado(estado: Estado): Observable<Estado> {
    const url = `${environment.apiUrl}/estados`;
    return this.http.post<Estado>(url, JSON.stringify(estado), this.httpOptions).pipe(
      map((estado: Estado) => {
        if (estado&&estado._id) {
          return estado;
        } 
        return null;
      }),
      catchError(this.handleError<Estado>('estado'))
    );
  }

  public actualizarEstado(estado: Estado): Observable<Estado> {
    const url = `${environment.apiUrl}/estados/${estado._id}`;
    return this.http.patch<Estado>(url, JSON.stringify(estado), this.httpOptions).pipe(
      map((estado: Estado) => {
        if (estado&&estado._id) {
          return estado;
        }
        return null;
      }),
      catchError(this.handleError<Estado>('estado'))
    );
  }

}