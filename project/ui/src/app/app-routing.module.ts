import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@modules/login/login.component';
import { RequisicaoComponent } from '@modules/requisicao/requisicao.component';

const routes: Routes = [
    { 
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('@modules/login/login-routing.module').then(m => m.LoginRoutingModule)
    },
    {
        path: 'home',
        loadChildren: () => import('@modules/home/home-routing.module').then(m => m.HomeRoutingModule)
    },
    {
        path: 'requisicao',
        loadChildren: () => import('@modules/requisicao/requisicao-routing.module').then(m => m.RequisicaoRoutingModule)
    },
    {
        path: 'requisicao/criar',
        component: RequisicaoComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }