import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env';

import { TipoOrganismo } from '@models/organismo';

import { Filter, Pager } from '@models/util';

@Injectable({
  providedIn: 'root'
})
export class TipoOrganismoService {

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

  public obtenerTiposOrganismos(filter: Filter): Observable<Pager> {
    const url = `${environment.apiUrl}/tiposorganismos?filter=${filter.filter}&fields=${filter.fields}&page=${filter.page}&limit=${filter.limit}&sort=${filter.sort}&order=${filter.order}`;
    return this.http.get<Pager>(url, this.httpOptions).pipe(
      map((response: Pager) => {
        if (response&&response.docs.length>0) {
          response.docs = response.docs as TipoOrganismo[];
          return response;
        }
        return new Pager();
      }),
      catchError(this.handleError<Pager>('response'))
    );
  }

  public obtenerAllTiposOrganismos(): Observable<TipoOrganismo[]> {
    const url = `${environment.apiUrl}/tiposorganismos/all`;
    return this.http.get<TipoOrganismo[]>(url, this.httpOptions).pipe(
      map((tiposOrganismos: TipoOrganismo[]) => {
        if (tiposOrganismos&&tiposOrganismos.length>0) {
          tiposOrganismos = tiposOrganismos as TipoOrganismo[];
          tiposOrganismos.sort((a,b) => (a.nivel > b.nivel) ? 1 : ((b.nivel > a.nivel) ? -1 : 0));
          return tiposOrganismos;
        }
        return new Array<TipoOrganismo>();
      }),
      catchError(this.handleError<TipoOrganismo[]>('tiposOrganismos'))
    );
  }

  public crearTipoOrganismo(tipoOrganismo: TipoOrganismo): Observable<TipoOrganismo> {
    const url = `${environment.apiUrl}/tiposorganismos`;
    return this.http.post<TipoOrganismo>(url, JSON.stringify(tipoOrganismo), this.httpOptions).pipe(
      map((o: TipoOrganismo) => {
        if (o&&o._id) {
          return o;
        } 
        return null;
      }),
      catchError(this.handleError<TipoOrganismo>('tipoOrganismo'))
    );
  }

  public actualizarTipoOrganismo(tipoOrganismo: TipoOrganismo): Observable<TipoOrganismo> {
    const url = `${environment.apiUrl}/tiposorganismos/${tipoOrganismo._id}`;
    return this.http.patch<TipoOrganismo>(url, JSON.stringify(tipoOrganismo), this.httpOptions).pipe(
      map((o: TipoOrganismo) => {
        if (o&&o._id) {
          return o;
        }
        return null;
      }),
      catchError(this.handleError<TipoOrganismo>('tipoOrganismo'))
    );
  }

}