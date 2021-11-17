import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "@shared/shared.module";

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { OrdemCompraTabelaComponent } from './ordem-compra-tabela/ordem-compra-tabela.component';
import { OrdemCompraAprovacaoComponent } from './ordem-compra-aprovacao/ordem-compra-aprovacao.component';
import { OrdemCompraRoutingModule } from './ordem-compra-routing.module';

@NgModule({
    declarations: [OrdemCompraTabelaComponent, OrdemCompraAprovacaoComponent ],
    imports: [
        CommonModule,
        SharedModule,
        OrdemCompraRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgxDatatableModule,
        NgxMaskModule.forRoot(),
        RouterModule
    ]
})
export class OrdemCompraModule {}