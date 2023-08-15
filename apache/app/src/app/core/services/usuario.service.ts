import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env';

import { User } from '@models/usuario';
import { Filter, Pager } from '@models/util';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  readonly roles: Array<string> = [ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ];
  
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

  public obtenerRoles(): string[] {
    return this.roles;
  }

  public obtenerUsuarios(filter: Filter): Observable<Pager> {
    const url = `${environment.apiUrl}/users?filter=${filter.filter}&fields=${filter.fields}&page=${filter.page}&limit=${filter.limit}&sort=${filter.sort}&order=${filter.order}`;
    return this.http.get<Pager>(url, this.httpOptions).pipe(
      map((response: Pager) => {
        if (response&&response.docs.length>0) {
          response.docs = response.docs as User[];
          return response;
        }
        return new Pager();
      }),
      catchError(this.handleError<Pager>('response'))
    );
  }

  public crearUsuario(user: User): Observable<User> {
    const url = `${environment.apiUrl}/users`;
    return this.http.post<User>(url, JSON.stringify(user), this.httpOptions).pipe(
      map((usuario: User) => {
        if (usuario&&usuario._id) {
          return usuario;
        } 
        return null;
      }),
      catchError(this.handleError<User>('usuario'))
    );
  }

  public actualizarUsuario(user: User): Observable<User> {
    const url = `${environment.apiUrl}/users/${user._id}`;
    return this.http.patch<User>(url, JSON.stringify(user), this.httpOptions).pipe(
      map((usuario: User) => {
        if (usuario&&usuario._id) {
          return usuario;
        }
        return null;
      }),
      catchError(this.handleError<User>('usuario'))
    );
  }

  public obtenerFullUsuario(_id: String): Observable<User> {
    const url = `${environment.apiUrl}/users/full/${_id}`;
    return this.http.get<User>(url, this.httpOptions).pipe(
      map((usuario: User) => {
        if (usuario&&usuario._id) {
          return usuario;
        } 
        return null;
      }),
      catchError(this.handleError<User>('usuario'))
    );
  }

}