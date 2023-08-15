import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env';

import { Operacion } from '@models/operacion';

import { StorageService } from '@core/services';

import { Filter, Pager } from '@models/util';

@Injectable({
  providedIn: 'root'
})
export class OperacionService {

  readonly tipos: Array<string> = [ 'Aérea', 'Terrestre', 'Fluvial', 'Marítima', 'Op. Control' ];
  
  readonly storageName: string = 'operaciones'; 
  
  constructor(
    private http: HttpClient,
    private storage: StorageService) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //console.error(error); // log to console instead
      
      return throwError(error);//error;
    };
  }

  public obtenerTipos(): string[] {
    return this.tipos;
  }

  public obtenerOperacionesLocal(): Promise<Operacion[]> {
    return this.storage.getByKey(this.storageName);
  }

  public eliminarOperacion(operacion: Operacion): Promise<Operacion[]> {
    return this.storage.getByKey(this.storageName).then(operaciones => {
      operaciones.forEach((o, index)  => {
        if (o.timestamp==operacion.timestamp) {
          operaciones.splice(index, 1);
        }
      });
      return this.storage.set(this.storageName, operaciones).then(()=> {
        return this.obtenerOperacionesLocal()
      });
    });
  }

  public agregarOperacion(operacion: Operacion): Promise<any> {
    return this.storage.getByKey(this.storageName).then((operaciones: Operacion[]) => {
      if (!operaciones||operaciones.length==0) {
        operaciones = new Array<Operacion>();
      }
      operaciones.push(operacion);
      return this.storage.set(this.storageName, operaciones);
    });
  }

  public editarOperacion(operacion: Operacion) {
    this.storage.getByKey(this.storageName).then(operaciones => {
      if (!operaciones||operaciones.length==0) {
        operaciones = new Array<Operacion>();
      }
      operaciones.forEach((o, index)  => {
        if (o.timestamp==operacion.timestamp) {
          operaciones.splice(index, 1);
        }
      });
      operaciones.push(operacion);
      this.storage.set(this.storageName, operaciones);
    });
  }

  public crearOperacion(operacion: Operacion): Observable<Operacion> {
    const url = `${environment.apiUrl}/operaciones`;
    return this.http.post<Operacion>(url, JSON.stringify(operacion), this.httpOptions).pipe(
      map((operacion: Operacion) => {
        if (operacion&&operacion._id) {
          return operacion;
        } 
        return null;
      }),
      catchError(this.handleError<Operacion>('operacion'))
    );
  }

  public actualizarOperacion(operacion: Operacion): Observable<Operacion> {
    const url = `${environment.apiUrl}/operaciones/${operacion._id}`;
    return this.http.patch<Operacion>(url, JSON.stringify(operacion), this.httpOptions).pipe(
      map((operacion: Operacion) => {
        if (operacion&&operacion._id) {
          return operacion;
        } 
        return null;
      }),
      catchError(this.handleError<Operacion>('operacion'))
    );
  }

  public obtenerOperacion(_id: String): Observable<Operacion> {
    const url = `${environment.apiUrl}/operaciones/${_id}`;
    return this.http.get<Operacion>(url, this.httpOptions).pipe(
      map((operacion: Operacion) => {
        if (operacion&&operacion._id) {
          return operacion;
        } 
        return null;
      }),
      catchError(this.handleError<Operacion>('operacion'))
    );
  }

  public obtenerFullOperacion(_id: String): Observable<Operacion> {
    const url = `${environment.apiUrl}/operaciones/full/${_id}`;
    return this.http.get<Operacion>(url, this.httpOptions).pipe(
      map((operacion: Operacion) => {
        if (operacion&&operacion._id) {
          return operacion;
        } 
        return null;
      }),
      catchError(this.handleError<Operacion>('operacion'))
    );
  }

  public obtenerOperaciones(filter: Filter): Observable<Pager> {
    const url = `${environment.apiUrl}/operaciones?filter=${filter.filter}&fields=${filter.fields}&page=${filter.page}&limit=${filter.limit}&sort=${filter.sort}&order=${filter.order}`;
    return this.http.get<Pager>(url, this.httpOptions).pipe(
      map((response: Pager) => {
        if (response&&response.docs.length>0) {
          response.docs = response.docs as Operacion[];
          return response;
        }
        return new Pager();
      }),
      catchError(this.handleError<Pager>('response'))
    );
  }

  public removerOperacion(_id: string): Observable<any> {
    const url = `${environment.apiUrl}/operaciones/${_id}`;
    return this.http.delete<Operacion>(url, this.httpOptions).pipe(
      map((response: any) => {
        if (response) {
          return response;
        } 
        return null;
      }),
      catchError(this.handleError<any>('response'))
    );
  }

}