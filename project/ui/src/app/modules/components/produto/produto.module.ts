import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "@shared/shared.module";

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ProdutoTabelaComponent } from './produto-tabela/produto-tabela.component';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoComponent } from './produto.component';

@NgModule({
    declarations: [ ProdutoTabelaComponent, ProdutoComponent ],
    imports: [
        CommonModule,
        SharedModule,
        ProdutoRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgxDatatableModule,
        NgxMaskModule.forRoot(),
        RouterModule
    ]
})
export class ProdutoModule {}