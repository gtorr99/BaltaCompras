import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { FornecedorTabelaComponent } from './fornecedor-tabela/fornecedor-tabela.component';
import { FornecedorComponent } from './fornecedor.component';

const routes: Routes = [
  {
    path: 'registrar',
    component: FornecedorComponent
  },
  {
    path: '',
    component: FornecedorTabelaComponent
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class FornecedorRoutingModule { }
