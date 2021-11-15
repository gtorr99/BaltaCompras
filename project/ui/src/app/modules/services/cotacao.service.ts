import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cotacao } from '@models/cotacao/cotacao.model';
import { BaseService } from './base-service.service';
import { Observable } from 'rxjs';
import { GrupoCotacao } from '@models/cotacao/grupo-cotacao.model';

@Injectable({ providedIn: 'root' })
export class CotacaoService extends BaseService<GrupoCotacao> {
    constructor(protected httpClient: HttpClient) { 
        super(httpClient, 'cotacao');
    }

    grupoCotacaoSelecionado: GrupoCotacao = new GrupoCotacao();

    cancelar(id: number): Observable<boolean> {
        return this.httpClient.put<boolean>(`http://localhost:8080/cotacao/cancelar/${id}`, null);
    }

    gerarCotacoes(): Observable<any> {
        return this.httpClient.get<any>(`http://localhost:8080/cotacao/gerar-cotacoes`);
    }

    listarCotacoesDoGrupo(id: number): Observable<Cotacao[]> {
        return this.httpClient.get<Cotacao[]>(`http://localhost:8080/cotacao/grupo-cotacao/${id}/listar-cotacoes`);
    }
}