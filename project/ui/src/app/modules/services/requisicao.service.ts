import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Requisicao } from '@models/requisicao/requisicao.model';
import { BaseService } from './base-service.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequisicaoService extends BaseService<Requisicao> {
    constructor(protected httpClient: HttpClient) { 
        super(httpClient, 'requisicao');
    }

    requisicaoSelecionada: Requisicao = new Requisicao();

    cancelar(id: number): Observable<boolean> {
        return this.httpClient.put<boolean>(`http://localhost:8080/requisicao/cancelar/${id}`, null);
    }

    aprovar(id: number): Observable<any> {
        return this.httpClient.put<any>(`http://localhost:8080/requisicao/aprovar/${id}`, null);
    }

    reprovar(id: number): Observable<any> {
        return this.httpClient.put<any>(`http://localhost:8080/requisicao/reprovar/${id}`, null);
    }

}