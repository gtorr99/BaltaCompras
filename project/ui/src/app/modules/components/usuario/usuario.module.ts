import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { SharedModule } from '@shared/shared.module';
import { UsuarioTabelaComponent } from './usuario-tabela/usuario-tabela.component';
import { UsuarioComponent } from './usuario.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [UsuarioComponent, UsuarioTabelaComponent, EditarPerfilComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxDatatableModule,
    NgxMaskModule.forRoot()
  ]
})
export class UsuarioModule { }