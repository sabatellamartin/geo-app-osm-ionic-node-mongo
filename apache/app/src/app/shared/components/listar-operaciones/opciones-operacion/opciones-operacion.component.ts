import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'opciones-operacion',
  templateUrl: './opciones-operacion.component.html',
  styleUrls: ['./opciones-operacion.component.scss'],
})
export class OpcionesOperacionComponent implements OnInit {

  opciones: any = [];
  selectedOpcion = null as any;

  constructor(
    private popoverCtrl: PopoverController) {
    this.obtenerOpciones();
  }

  ngOnInit() {}

  async cerrar() {
    await this.popoverCtrl.dismiss(this.selectedOpcion);
  }

  obtenerOpciones() {
    this.opciones = [
      {
        id: 'eliminar',
        descripcion: 'Eliminar',
      },
      {
        id: 'detalles',
        descripcion: 'Detalles'
      }
    ];
  }

  public seleccionOpcion(opcionId: string) {
    this.selectedOpcion = opcionId;
    this.cerrar();
  }

}
