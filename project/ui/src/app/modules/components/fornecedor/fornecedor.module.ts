import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { SharedModule } from '@shared/shared.module';
import { FornecedorTabelaComponent } from './fornecedor-tabela/fornecedor-tabela.component';
import { FornecedorComponent } from './fornecedor.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [FornecedorComponent, FornecedorTabelaComponent ],
  imports: [
    CommonModule,
    FornecedorRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxDatatableModule,
    NgxMaskModule.forRoot()
  ]
})
export class FornecedorModule { }