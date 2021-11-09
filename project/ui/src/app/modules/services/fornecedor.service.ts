import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fornecedor } from '@models/fornecedor.model';
import { BaseService } from './base-service.service';
import { Observable } from 'rxjs';
import { CEP } from '@models/cep.model';

@Injectable({ providedIn: 'root' })
export class FornecedorService extends BaseService<Fornecedor> {
    constructor(protected httpClient: HttpClient) { 
        super(httpClient, 'fornecedor');
    }

    verificarCEP(cep: string): Observable<CEP> {
        return this.httpClient.get<CEP>(`https://viacep.com.br/ws/${cep}/json/`);
    }
}