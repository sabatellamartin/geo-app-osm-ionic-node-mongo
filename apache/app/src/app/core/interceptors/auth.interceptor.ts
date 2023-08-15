import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Tutorial interceptors
   * https://medium.com/@insomniocode/angular-autenticación-usando-interceptors-a26c167270f4
   */

  sesion: any;

  constructor(
    private authService: AuthService
  ) {
    this.authService.sesion.subscribe(sesion => {
      console.log("Interceptor subscribe");
      this.sesion = sesion;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const sesion = this.sesion;
    if (sesion && sesion.token) {
      request = request.clone({
          setHeaders: {
              Authorization: `Bearer ${sesion.token}`
          }
      });
      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.authService.logout();
          }
          return throwError( err );
        })
      );
    }
    return next.handle(request);
  }

}
