import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "@shared/shared.module";

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { CotacaoComponent } from './cotacao.component';
import { CotacaoTabelaComponent } from './cotacao-tabela/cotacao-tabela.component';
import { CotacaoRoutingModule } from './cotacao-routing.module';

@NgModule({
    declarations: [ CotacaoComponent, CotacaoTabelaComponent ],
    imports: [
        CommonModule,
        SharedModule,
        CotacaoRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgxDatatableModule,
        NgxMaskModule.forRoot(),
        RouterModule
    ]
})
export class CotacaoModule {}