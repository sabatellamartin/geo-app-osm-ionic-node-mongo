import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env';

import { Reporte } from '@models/comunicacion';
import { Operacion } from '@models/operacion';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

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

  public agregarReportes(reportes: Reporte[], operacion: Operacion): any {
    if (reportes&&reportes.length>0) {
      if (operacion&&operacion._id) {
        reportes.forEach(async (reporte:Reporte) => {
          reporte.operacion = operacion;
          reporte.user = operacion.user;
          if (reporte&&!reporte._id) {
            await this.crearReporte(reporte).toPromise();/*.subscribe((response:Reporte) => { console.log(response); });*/
            return true;
          } else if (reporte&&reporte._id) {
            await this.actualizarReporte(reporte).toPromise();/*.subscribe((response:Reporte) => { console.log(response); });*/
            return true;
          }
        });
      }
    }
    return false;
  }

  public crearReporte(reporte: Reporte): Observable<Reporte> {
    const url = `${environment.apiUrl}/reportes`;
    return this.http.post<Reporte>(url, JSON.stringify(reporte), this.httpOptions).pipe(
      map((reporte: Reporte) => {
        if (reporte&&reporte._id) {
          return reporte;
        } 
        return null;
      }),
      catchError(this.handleError<Reporte>('reporte'))
    );
  }

  public actualizarReporte(reporte: Reporte): Observable<Reporte> {
    const url = `${environment.apiUrl}/reportes/${reporte._id}`;
    return this.http.patch<Reporte>(url, JSON.stringify(reporte), this.httpOptions).pipe(
      map((reporte: Reporte) => {
        if (reporte&&reporte._id) {
          return reporte;
        }
        return null;
      }),
      catchError(this.handleError<Reporte>('reporte'))
    );
  }

}