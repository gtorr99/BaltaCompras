import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service.service';
import { Permissao } from '@models/permissao.model';

@Injectable({ providedIn: 'root' })
export class PermissaoService extends BaseService<Permissao> {
    constructor(protected httpClient: HttpClient) { 
        super(httpClient, 'permissao');
    }
}