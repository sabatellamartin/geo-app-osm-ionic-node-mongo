import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env';

import { Organismo } from '@models/organismo';
import { Filter, Pager } from '@models/util';

@Injectable({
  providedIn: 'root'
})
export class OrganismoService {

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

  public obtenerAllOrganismos(): Observable<Organismo[]> {
    const url = `${environment.apiUrl}/organismos/all`;
    return this.http.get<Organismo[]>(url, this.httpOptions).pipe(
      map((organismos: Organismo[]) => {
        if (organismos&&organismos.length>0) {
          organismos = organismos as Organismo[];
          organismos.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0));
          return organismos;
        }
        return new Array<Organismo>();
      }),
      catchError(this.handleError<Organismo[]>('organismos'))
    );
  }

  public obtenerOrganismos(filter: Filter): Observable<Pager> {
    const url = `${environment.apiUrl}/organismos?filter=${filter.filter}&fields=${filter.fields}&page=${filter.page}&limit=${filter.limit}&sort=${filter.sort}&order=${filter.order}`;
    return this.http.get<Pager>(url, this.httpOptions).pipe(
      map((response: Pager) => {
        if (response&&response.docs.length>0) {
          response.docs = response.docs as Organismo[];
          return response;
        }
        return new Pager();
      }),
      catchError(this.handleError<Pager>('response'))
    );
  }

  public crearOrganismo(organismo: Organismo): Observable<Organismo> {
    const url = `${environment.apiUrl}/organismos`;
    return this.http.post<Organismo>(url, JSON.stringify(organismo), this.httpOptions).pipe(
      map((o: Organismo) => {
        if (o&&o._id) {
          return o;
        } 
        return null;
      }),
      catchError(this.handleError<Organismo>('organismo'))
    );
  }

  public actualizarOrganismo(organismo: Organismo): Observable<Organismo> {
    const url = `${environment.apiUrl}/organismos/${organismo._id}`;
    return this.http.patch<Organismo>(url, JSON.stringify(organismo), this.httpOptions).pipe(
      map((o: Organismo) => {
        if (o&&o._id) {
          return o;
        }
        return null;
      }),
      catchError(this.handleError<Organismo>('organismo'))
    );
  }

  public obtenerFullOrganismo(_id: String): Observable<Organismo> {
    const url = `${environment.apiUrl}/organismos/full/${_id}`;
    return this.http.get<Organismo>(url, this.httpOptions).pipe(
      map((organismo: Organismo) => {
        if (organismo&&organismo._id) {
          return organismo;
        } 
        return null;
      }),
      catchError(this.handleError<Organismo>('organismo'))
    );
  }

}