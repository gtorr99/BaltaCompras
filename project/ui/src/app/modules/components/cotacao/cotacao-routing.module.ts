import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CotacaoComponent } from './cotacao.component';
import { CotacaoTabelaComponent } from './cotacao-tabela/cotacao-tabela.component';

const routes: Routes = [
    {
        path: 'grupo-cotacao',
        component: CotacaoComponent
    },
    {
        path: '',
        component: CotacaoTabelaComponent
    }
];

@NgModule ({
    imports: [ CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class CotacaoRoutingModule {}