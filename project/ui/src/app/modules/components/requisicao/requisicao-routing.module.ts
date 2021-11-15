import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { RequisicaoTabelaComponent } from './requisicao-tabela/requisicao-tabela.component';
import { RequisicaoComponent } from './requisicao.component';
import { RequisicaoAprovacaoComponent } from './requisicao-aprovacao/requisicao-aprovacao.component';

const routes: Routes = [
    {
        path: 'criar',
        component: RequisicaoComponent
    },
    {
        path: 'aprovacao',
        component: RequisicaoAprovacaoComponent
    },
    {
        path: '',
        component: RequisicaoTabelaComponent
    }
];

@NgModule ({
    imports: [ CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class RequisicaoRoutingModule {}