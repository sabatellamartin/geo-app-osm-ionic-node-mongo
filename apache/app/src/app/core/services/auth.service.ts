import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { StorageService } from '@core/services';
import { Sesion, Credenciales } from '@models/usuario';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sesionSubject: BehaviorSubject<Sesion> = new BehaviorSubject<Sesion>(null);
  public sesion: Observable<Sesion> = this.sesionSubject.asObservable();

  readonly storageName: string = environment.storageSesionName;
  
  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return error;
    };
  }

  public login(credenciales: Credenciales): Observable<Sesion> {
    const req: any =  {
      'email': credenciales.email,
      'password': credenciales.password
    };
    const url = `${environment.apiUrl}/login`;
    return this.http.post<Sesion>(url, req, this.httpOptions).pipe(
      map((sesion: Sesion) => {
        if (sesion) {
          this.agregarSesionStorage(sesion);
          this.sesionSubject.next(sesion);  
        } else {
          this.logout();
        }
        return sesion;
      }),
      catchError(this.handleError<Sesion>('sesion'))
    );
  }
  
  public logout() {
    this.eliminarSesionStorage();
    this.sesionSubject.next(null);
    location.reload();
  }
  
  public async loadSessionIfExist(){
    let sesion: Sesion = await this.obtenerSesionStorage();
    if (sesion) {
      this.sesionSubject.next(sesion);
    } else {
      this.sesionSubject.next(null);
    }
  }

  private obtenerSesionStorage(): Promise<Sesion> {
    return this.storage.getByKey(this.storageName);
  }

  private eliminarSesionStorage() {
    return this.storage.remove(this.storageName);
  }

  private async agregarSesionStorage(sesion: Sesion): Promise<any> {
    return await this.storage.set(this.storageName, sesion);
  }

}