import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcessoNegadoComponent } from '@shared/components';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component'

const routes: Routes = [
    { 
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('@modules/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'requisicao',
        loadChildren: () => import('@modules/requisicao/requisicao.module').then(m => m.RequisicaoModule)
    },
    {
        path: 'grupo-cotacao',
        loadChildren: () => import('@modules/grupo-cotacao/grupo-cotacao.module').then(m => m.GrupoCotacaoModule)
    },
    {
        path: 'ordem-compra',
        loadChildren: () => import('@modules/ordem-compra/ordem-compra.module').then(m => m.OrdemCompraModule)
    },
    {
        path: 'fornecedor',
        loadChildren: () => import('@modules/fornecedor/fornecedor.module').then(m => m.FornecedorModule)
    },
    {
        path: 'administracao/produto',
        loadChildren: () => import('@modules/produto/produto.module').then(m => m.ProdutoModule)
    },
    {
        path: 'administracao/usuario',
        loadChildren: () => import('@modules/usuario/usuario.module').then(m => m.UsuarioModule)
    },
    {
        path: 'acesso-negado',
        component: AcessoNegadoComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }