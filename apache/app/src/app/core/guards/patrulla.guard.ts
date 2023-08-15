import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../services';
import { Sesion } from '@models/usuario';

import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class PatrullaGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authService.sesion.pipe(
      map((sesion: Sesion) => {
        if (sesion
          &&sesion.token
          &&sesion.user
          &&sesion.user.role
          &&sesion.user.role==environment.PATRULLA) {
          // authorised so return true
          return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      })
    );
  }

}
