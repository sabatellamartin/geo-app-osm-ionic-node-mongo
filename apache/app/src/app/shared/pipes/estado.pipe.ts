import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
import * as moment from 'moment';
import { 
    EstadoService
  } from '@core/services';

@Pipe({name: 'estadoActual'})
export class EstadoPipe implements PipeTransform {

    constructor(
        private estadoService: EstadoService
    ) {}

    transform(operacion, attr: string): string {
        const estado = this.estadoService.obtenerEstadoActual(operacion)
        if (attr=='tipo') {
            return estado&&estado.tipo?estado.tipo:'';
        } else if (attr=='timestamp') {
            return estado&&estado.timestamp?moment(estado.timestamp).format("DD/MM/YYYY HH:mm:ss a"):'';
        } else {
            return estado&&estado.tipo?estado.tipo:'';
        }
    }
}