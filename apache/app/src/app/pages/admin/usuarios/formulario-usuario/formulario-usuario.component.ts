import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { User } from '@models/usuario';
import { Organismo } from '@models/organismo';
import { TipoOrganismo } from '@models/organismo';
import { UsuarioService } from '@core/services';
import { OrganismoService } from '@core/services';
import { TipoOrganismoService } from '@core/services';

@Component({
  selector: 'formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss'],
})
export class FormularioUsuarioComponent implements OnInit, OnDestroy {

  @Input('usuario') usuario: User;
  opcionesVerificacion: any;
  roles: string[];
  changePassword: boolean = false;
  tiposOrganismos: TipoOrganismo[] = new Array<TipoOrganismo>();
  organismos: Organismo[] = new Array<Organismo>();
  fuerzas: Organismo[] = new Array<Organismo>();
  divisiones: Organismo[] = new Array<Organismo>();
  brigadas: Organismo[] = new Array<Organismo>();
  unidades: Organismo[] = new Array<Organismo>();

  constructor(
    private usuarioService: UsuarioService,
    private organismoService: OrganismoService,
    private tipoOrganismoService: TipoOrganismoService,
    private modalCtrl: ModalController,
    public toastController: ToastController) {
    
    this.roles = this.usuarioService.obtenerRoles();
    //this.obtenerAllOrganismos();
    this.opcionesVerificacion = [
      {clave:'true',valor:'Verificado'},
      {clave:'false',valor:'No Verificado'}
    ];

  }

  ngOnInit() {
    if (!this.usuario) {
      this.usuario = new User();
      this.presentToast('Usuario nuevo');
    }
    this.cargarOrganismos();
  }

  ngOnDestroy() {}

  alCambiarVerificado() {}
  
  alCambiarRol() {
    if(!this.roles.includes(this.usuario.role)) {
      this.presentToast('No se puede cargar el rol');
    } 
  }
  
  private async cargarOrganismos() {
    this.obtenerAllTiposOrganismos();
    const promise = this.organismoService.obtenerAllOrganismos().toPromise();
    const response = await Promise.resolve(promise);
    response.forEach((organismo: Organismo) => {
      organismo.tipoOrganismo = this.tiposOrganismos.find((t:TipoOrganismo) => organismo.tipoOrganismo?organismo.tipoOrganismo.toString()===t._id:false) as TipoOrganismo;
      this.organismos.push(organismo);
    });
    this.seleccionarOrganismosPorNivel(1);
    this.obtenerFullUsuario();
  }

  private async obtenerAllTiposOrganismos() {
    const promise = this.tipoOrganismoService.obtenerAllTiposOrganismos().toPromise();
    this.tiposOrganismos = await Promise.resolve(promise);
  }

  private async obtenerFullUsuario() {
    if (this.usuario._id) {
      const promise = this.usuarioService.obtenerFullUsuario(this.usuario._id).toPromise();
      this.usuario = await Promise.resolve(promise);
      if (this.usuario.fuerza&&this.usuario.fuerza._id) {
        this.divisiones = this.organismos.filter((o: Organismo) => { return o.organismo?o.organismo.toString()===this.usuario.fuerza._id:false });
      }
      if (this.usuario.division&&this.usuario.division._id) {
        this.brigadas = this.organismos.filter((o: Organismo) => { return o.organismo?o.organismo.toString()===this.usuario.division._id:false });
      }
      if (this.usuario.brigada&&this.usuario.brigada._id) {
        this.unidades = this.organismos.filter((o: Organismo) => { return o.organismo?o.organismo.toString()===this.usuario.brigada._id:false });
      }
    }
  }

  private seleccionarOrganismosPorNivel(nivel: number) {
    let selectedOrganismos: Array<Organismo> = this.organismos.filter((o: Organismo) => o&&o.tipoOrganismo&&o.tipoOrganismo.nivel&&nivel?o.tipoOrganismo.nivel===nivel:false );
    if (nivel===1) {
      this.fuerzas = selectedOrganismos;
    } else if (nivel===2) {
      this.divisiones = selectedOrganismos;
    } else if (nivel===3) {
      this.brigadas = selectedOrganismos;
    } else if (nivel===4) {
      this.unidades = selectedOrganismos;
    }
  }

  alCambiarFuerza() {
    if (this.usuario&&this.usuario.fuerza&&this.usuario.fuerza._id) {
      this.divisiones = this.organismos.filter((o: Organismo) => { return o.organismo?o.organismo.toString()===this.usuario.fuerza._id:false });
    }
    this.usuario.division = null as Organismo;
    this.usuario.brigada = null as Organismo;
    this.usuario.unidad = null as Organismo;
    this.brigadas = new Array<Organismo>();
    this.unidades = new Array<Organismo>();
  }

  alCambiarDivision() {
    if (this.usuario&&this.usuario.division&&this.usuario.division._id) {
      this.brigadas = this.organismos.filter((o: Organismo) => { return o.organismo?o.organismo.toString()===this.usuario.division._id:false });
    }
    this.usuario.brigada = null as Organismo;
    this.usuario.unidad = null as Organismo;
    this.unidades = new Array<Organismo>();
  }

  alCambiarBrigada() {
    if (this.usuario&&this.usuario.brigada&&this.usuario.brigada._id) {
      this.unidades = this.organismos.filter((o: Organismo) => { return o.organismo?o.organismo.toString()===this.usuario.brigada._id:false });
    }
  }

  alCambiarUnidad() {}

  toggleChangePassword() {
    this.changePassword = !this.changePassword;
  }

  public guardar() {
    let usuario: User = this.usuario;
    if (!usuario) {
      this.presentToast('No se puede guardar el usuario');
      return;
    }
    if (!usuario.email) {
      this.presentToast('Escriba el email del usuario antes de guardar');
      return;
    }
    if (usuario._id) {
      this.usuarioService.actualizarUsuario(usuario).subscribe((response:any) => {
        if(response) {
          this.cancelar('Usuario creado');
        }
      });
    } else {
      this.usuarioService.crearUsuario(usuario).subscribe((response:any)=> {
        if(response) {
          this.cancelar('Usuario actualizado');
        }
      });
    }
  }

  async cancelar(mensaje: string) {
    if (mensaje&&mensaje.length>0) {
      this.presentToast(mensaje);
    }
    await this.modalCtrl.dismiss({
      'usuario': this.usuario,
      'mensaje': mensaje
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  compareFn(o1: any, o2: any) {
    return o1 && o2 ? o1._id === o2._id : o1 === o2;
  }
  
}
