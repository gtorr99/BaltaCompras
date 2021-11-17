import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ProdutoTabelaComponent } from './produto-tabela/produto-tabela.component';
import { ProdutoComponent } from './produto.component';

const routes: Routes = [
    {
        path: 'novo',
        component: ProdutoComponent
    },
    {
        path: '',
        component: ProdutoTabelaComponent
    }
];

@NgModule ({
    imports: [ CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class ProdutoRoutingModule {}