import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsuariosPage } from './usuarios.page';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';

import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPage
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
    UsuariosPage,
    FormularioUsuarioComponent
  ],
  entryComponents: []
})
export class UsuariosPageModule {}
