import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { GrupoCotacaoComponent } from './grupo-cotacao.component';
import { GrupoCotacaoTabelaComponent } from './grupo-cotacao-tabela/grupo-cotacao-tabela.component';
import { CotacaoExternaComponent } from './cotacao-externa/cotacao-externa.component';

const routes: Routes = [
    {
        path: 'cotacao',
        component: GrupoCotacaoComponent
    },
    {
        path: 'cotacao-fornecedor/:id',
        component: CotacaoExternaComponent
    },
    {
        path: '',
        component: GrupoCotacaoTabelaComponent
    }
];

@NgModule ({
    imports: [ CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class GrupoCotacaoRoutingModule {}