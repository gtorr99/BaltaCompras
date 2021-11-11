import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service.service';
import { GrupoProduto } from '@models/grupo-produto.model';

@Injectable({ providedIn: 'root' })
export class GrupoProdutoService extends BaseService<GrupoProduto> {
    constructor(protected httpClient: HttpClient) { 
        super(httpClient, 'grupo-produto');
    }
}