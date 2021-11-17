import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "@shared/shared.module";
import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { RequisicaoTabelaComponent } from './requisicao-tabela/requisicao-tabela.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequisicaoAprovacaoComponent } from './requisicao-aprovacao/requisicao-aprovacao.component';
import { RouterModule } from '@angular/router';
@NgModule({
    declarations: [RequisicaoComponent, RequisicaoTabelaComponent, RequisicaoAprovacaoComponent ],
    imports: [
        CommonModule,
        SharedModule,
        RequisicaoRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgxDatatableModule,
        NgxMaskModule.forRoot()
    ]
})
export class RequisicaoModule {}