import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service.service';
import { Funcao } from '@models/funcao.model';

@Injectable({ providedIn: 'root' })
export class FuncaoService extends BaseService<Funcao> {
    constructor(protected httpClient: HttpClient) { 
        super(httpClient, 'funcao');
    }
}