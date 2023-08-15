import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cabezal-busqueda',
  templateUrl: './cabezal-busqueda.component.html',
  styleUrls: ['./cabezal-busqueda.component.scss'],
})
export class CabezalBusquedaComponent implements OnInit {

  @Input('titulo') titulo;
  @Output() buscarEvent = new EventEmitter<string>();
  search: boolean = false;

  constructor() {}

  ngOnInit() {}

  activeSearch() {
    this.search = !this.search;
  }

  buscar(event: any) {
    this.buscarEvent.emit(event.detail.value);
  }

  limpiar() {
    this.buscarEvent.emit('');
  }
  
}
