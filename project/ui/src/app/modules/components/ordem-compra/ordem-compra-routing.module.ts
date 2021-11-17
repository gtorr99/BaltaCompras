import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { OrdemCompraTabelaComponent } from './ordem-compra-tabela/ordem-compra-tabela.component';
import { OrdemCompraAprovacaoComponent } from './ordem-compra-aprovacao/ordem-compra-aprovacao.component';

const routes: Routes = [
    {
        path: 'aprovacao',
        component: OrdemCompraAprovacaoComponent
    },
    {
        path: '',
        component: OrdemCompraTabelaComponent
    }
];

@NgModule ({
    imports: [ CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class OrdemCompraRoutingModule {}