import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env';

import { Perfil } from '@models/usuario';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

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

  public obtenerPerfil(): Observable<Perfil> {
    const url = `${environment.apiUrl}/profile`;
    return this.http.get<Perfil>(url, this.httpOptions).pipe(
      map((perfil: Perfil) => {
        if (perfil) {
          return perfil;
        } 
        return null;
      }),
      catchError(this.handleError<Perfil>('perfil'))
    );
  }

  public actualizarPerfil(perfil: Perfil): Observable<Perfil> {
    const url = `${environment.apiUrl}/profile`;
    return this.http.patch<Perfil>(url, JSON.stringify(perfil), this.httpOptions).pipe(
      map((perfil: Perfil) => {
        if (perfil) {
          return perfil;
        }
        return null;
      }),
      catchError(this.handleError<Perfil>('perfil'))
    );
  }

  public cambiarPassword(oldPassword: string, newPassword: string): Observable<any> {
    let body = {
      "oldPassword": oldPassword,
      "newPassword": newPassword
    };
    const url = `${environment.apiUrl}/profile/changePassword`;
    return this.http.post<any>(url, JSON.stringify(body), this.httpOptions).pipe(
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