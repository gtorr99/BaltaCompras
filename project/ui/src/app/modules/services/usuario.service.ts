import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service.service';
import { Usuario } from '@models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService extends BaseService<Usuario> {
    constructor(protected httpClient: HttpClient) { 
        super(httpClient, 'administracao/usuario');
    }
}