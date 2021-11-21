import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { UsuarioTabelaComponent } from './usuario-tabela/usuario-tabela.component';
import { UsuarioComponent } from './usuario.component';

const routes: Routes = [
  {
    path: 'editar-perfil',
    component: EditarPerfilComponent
  },
  {
    path: '',
    component: UsuarioTabelaComponent
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class UsuarioRoutingModule { }
