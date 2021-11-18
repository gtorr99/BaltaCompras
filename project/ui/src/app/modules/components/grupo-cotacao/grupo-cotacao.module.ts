import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "@shared/shared.module";

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { GrupoCotacaoComponent } from './grupo-cotacao.component';
import { GrupoCotacaoTabelaComponent } from './grupo-cotacao-tabela/grupo-cotacao-tabela.component';
import { GrupoCotacaoRoutingModule } from './grupo-cotacao-routing.module';
import { CotacaoExternaComponent } from './cotacao-externa/cotacao-externa.component';

@NgModule({
    declarations: [ GrupoCotacaoComponent, GrupoCotacaoTabelaComponent, CotacaoExternaComponent ],
    imports: [
        CommonModule,
        SharedModule,
        GrupoCotacaoRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgxDatatableModule,
        NgxMaskModule.forRoot(),
        RouterModule
    ]
})
export class GrupoCotacaoModule {}