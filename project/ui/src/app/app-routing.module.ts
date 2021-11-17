import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component'

const routes: Routes = [
    { 
        path: '',
        redirectTo: 'requisicao',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('@modules/login/login.module').then(m => m.LoginModule)
    },
    // {
    //     path: 'home',
    //     loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule)
    // },
    {
        path: 'requisicao',
        loadChildren: () => import('@modules/requisicao/requisicao.module').then(m => m.RequisicaoModule)
    },
    {
        path: 'cotacao',
        loadChildren: () => import('@modules/cotacao/cotacao.module').then(m => m.CotacaoModule)
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
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }