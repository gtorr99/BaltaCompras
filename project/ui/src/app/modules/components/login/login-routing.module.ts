import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { LoginComponent } from '@modules/login/login.component';
import { NovaSenhaComponent } from './nova-senha/nova-senha.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';

const routes: Routes = [
    {
        path: 'recuperar-senha',
        component: RecuperarSenhaComponent
    },
    {
        path: 'cadastrar-nova-senha/:id',
        component: NovaSenhaComponent
    },
    {
        path: '',
        component: LoginComponent
    }
];

@NgModule ({
    imports: [ CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class LoginRoutingModule {}