import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "@shared/shared.module";
import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { RequisicaoTabelaComponent } from './requisicao-tabela/requisicao-tabela.component';

@NgModule({
    declarations: [ RequisicaoComponent, RequisicaoTabelaComponent ],
    imports: [CommonModule, SharedModule, RequisicaoRoutingModule]
})
export class RequisicaoModule {}