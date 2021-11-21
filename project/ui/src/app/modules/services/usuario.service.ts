import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service.service';
import { Usuario } from '@models/usuario.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';

const baseUrl = "http://localhost:8080";

@Injectable({ providedIn: 'root' })
export class UsuarioService extends BaseService<Usuario> {
    constructor(protected httpClient: HttpClient, private router: Router) { 
        super(httpClient, 'administracao/usuario');
        let cookie = JSON.parse(localStorage.getItem('currentUser'));
        if (cookie) {
            this.usuarioLogado = new Usuario(cookie);
        }
    }

    reloadMenu: EventEmitter<any> = new EventEmitter();
    private usuarioLogado: Usuario = null;

    validarUsuario(email: string, senha: string): Observable<Usuario> {
        return this.httpClient.post<Usuario>(`${baseUrl}/${this.resourceUrl}/validar`, { email: email, hashSenha: this.hashString(senha)});
    }

    getUsuarioLogado(): Usuario {
        return this.usuarioLogado;
    }

    updateUsuarioLogado(usuario: Usuario) {
        this.usuarioLogado = new Usuario(usuario);
        localStorage.setItem('currentUser', JSON.stringify(this.usuarioLogado));
    }

    logout() {
        this.usuarioLogado = null;
        localStorage.removeItem('currentUser');
        this.onReloadMenu();
        this.router.navigate(['/login']);
    }

    onReloadMenu() {
        this.reloadMenu.emit();
    }

    verificarPermissao(permissao: string): boolean {
        if (this.usuarioLogado != null) {
            let usuario = this.usuarioLogado.funcao.permissoes.find(p => p.descricao == permissao || p.descricao == "Administrador");
            return usuario != undefined;
        }
        return false;
    }

    hashString(value: string): string {
        return Md5.hashStr(value);
    }
}