import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrganismosPage } from './organismos.page';
import { FormularioOrganismoComponent } from './formulario-organismo/formulario-organismo.component';

import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: OrganismosPage
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    OrganismosPage,
    FormularioOrganismoComponent
  ],
  entryComponents: []
})
export class OrganismosPageModule {}
