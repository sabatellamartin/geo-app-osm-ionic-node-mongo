import { GeoService } from './geo.service';
import { PositionService } from './position.service';
import { StorageService } from './storage.service';
import { OperacionService } from './operacion.service';
import { ReporteService } from './reporte.service';
import { MensajeService } from './mensaje.service';
import { RecorridoService } from './recorrido.service';
import { FechaService } from './fecha.service';
import { AuthService } from './auth.service';
import { UsuarioService } from './usuario.service';
import { OrganismoService } from './organismo.service';
import { TipoOrganismoService } from './tipo-organismo.service';
import { PerfilService } from './perfil.service';
import { EstadoService } from './estado.service';

export const providers: any[] = [
  GeoService,
  PositionService,
  StorageService,
  OperacionService,
  ReporteService,
  MensajeService,
  RecorridoService,
  FechaService,
  AuthService,
  UsuarioService,
  OrganismoService,
  TipoOrganismoService,
  PerfilService,
  EstadoService
];

export * from './geo.service';
export * from './position.service';
export * from './storage.service';
export * from './operacion.service';
export * from './reporte.service';
export * from './mensaje.service';
export * from './recorrido.service';
export * from './fecha.service';
export * from './auth.service';
export * from './usuario.service';
export * from './organismo.service';
export * from './tipo-organismo.service';
export * from './perfil.service';
export * from './estado.service';