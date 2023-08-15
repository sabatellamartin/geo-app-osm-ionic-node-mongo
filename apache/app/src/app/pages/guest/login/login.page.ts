import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from  "@angular/router";

import { Subscription } from 'rxjs';

import { AuthService } from '@core/services';

import { Sesion, Credenciales } from '@models/usuario';

import { environment } from '@env';

@Component({
  selector: 'guest-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit, OnDestroy {

  sesion: Sesion;
  sesionSubscription: Subscription;

  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone:NgZone,
    private authService: AuthService
  ) {
    this.authService.loadSessionIfExist().then(()=> {
      this.sesionSubscription = this.authService.sesion.subscribe((sesion: Sesion) => {
        //console.log(sesion);
        if (sesion
          &&sesion.token
          &&sesion.user
          &&sesion.user.role) {
          let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          if (sesion.user&&sesion.user.role) {
            if (sesion.user.role==environment.ADMINISTRADOR) {
              returnUrl = "/admin";
            } else if(sesion.user.role==environment.COMANDO) {
              returnUrl = "/comando";          
            } else if(sesion.user.role==environment.OPERACIONES) {
              returnUrl = "/operaciones";
            } else if(sesion.user.role==environment.PATRULLA) {
              returnUrl = "/patrulla";
            }
          } else {
            returnUrl = "/login";
          }
          this.ngZone.run(()=>this.router.navigate([returnUrl]));
        }
      }, (err: any) => console.log(err));
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.sesionSubscription) {
      this.sesionSubscription.unsubscribe();
    }
  }

  public login(form: { value: { email: string; password: string; }; }) {
    console.log("Evento login");
    let credenciales: Credenciales = new Credenciales();
    credenciales.email = form.value.email!="" ? form.value.email.toLowerCase().trim() : null;
    credenciales.password = form.value.password!="" ? form.value.password : null;
    if (!credenciales.email||!credenciales.password) {return}
    this.authService.login(credenciales).subscribe((sesion:Sesion) => {
      if (sesion) {
        console.log("login success");
      } else {
        console.log("login failed");  
      }
    });
  }

  /*
  irAInicio() {
    let url: string = '/invitados/inicio';
    this.router.navigate([url]);
  }*/

}