import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env';

import { Recorrido } from '@models/operacion';
import { Operacion } from '@models/operacion';

@Injectable({
  providedIn: 'root'
})
export class RecorridoService {

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

  public agregarRecorridos(recorridos: Recorrido[], operacion: Operacion):any {
    if (recorridos&&recorridos.length>0) {
      if (operacion&&operacion._id) {
        recorridos.forEach(async (recorrido:Recorrido) => {
          recorrido.operacion = operacion;
          //recorrido.user = operacion.user;
          if (recorrido&&!recorrido._id) {
            await this.crearRecorrido(recorrido).toPromise();/*.subscribe((response:Recorrido) => { console.log(response); });*/
            return true;
          } else if (recorrido&&recorrido._id) {
            await this.actualizarRecorrido(recorrido).toPromise();/*.subscribe((response:Recorrido) => { console.log(response); });*/
            return true;
          }
        });
      }
    }
    return false;
  }

  public crearRecorrido(recorrido: Recorrido): Observable<Recorrido> {
    const url = `${environment.apiUrl}/recorridos`;
    return this.http.post<Recorrido>(url, JSON.stringify(recorrido), this.httpOptions).pipe(
      map((recorrido: Recorrido) => {
        if (recorrido&&recorrido._id) {
          return recorrido;
        } 
        return null;
      }),
      catchError(this.handleError<Recorrido>('recorrido'))
    );
  }

  public actualizarRecorrido(recorrido: Recorrido): Observable<Recorrido> {
    const url = `${environment.apiUrl}/recorridos/${recorrido._id}`;
    return this.http.patch<Recorrido>(url, JSON.stringify(recorrido), this.httpOptions).pipe(
      map((recorrido: Recorrido) => {
        if (recorrido&&recorrido._id) {
          return recorrido;
        }
        return null;
      }),
      catchError(this.handleError<Recorrido>('recorrido'))
    );
  }

}