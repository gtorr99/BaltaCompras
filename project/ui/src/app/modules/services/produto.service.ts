import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service.service';
import { Produto } from '@models/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutoService extends BaseService<Produto> {
    constructor(protected httpClient: HttpClient) { 
        super(httpClient, 'produto');
    }
}