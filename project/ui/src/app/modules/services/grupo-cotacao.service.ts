import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cotacao } from '@models/grupo-cotacao/cotacao.model';
import { BaseService } from './base-service.service';
import { Observable } from 'rxjs';
import { GrupoCotacao } from '@models/grupo-cotacao/grupo-cotacao.model';

@Injectable({ providedIn: 'root' })
export class GrupoCotacaoService extends BaseService<GrupoCotacao> {
    constructor(protected httpClient: HttpClient) { 
        super(httpClient, 'grupo-cotacao');
    }

    grupoCotacaoSelecionado: GrupoCotacao = new GrupoCotacao();

    cancelar(id: number): Observable<boolean> {
        return this.httpClient.put<boolean>(`http://localhost:8080/grupo-cotacao/cancelar/${id}`, null);
    }

    gerarCotacoes(): Observable<any> {
        return this.httpClient.get<any>(`http://localhost:8080/grupo-cotacao/gerar-cotacoes`);
    }

    alterarCotacao(cotacao: Cotacao): Observable<any> {
        return this.httpClient.put<any>(`http://localhost:8080/cotacao/alterar`, cotacao);
    }

    salvarCotacao(cotacao: Cotacao): Observable<any> {
        return this.httpClient.post<any>(`http://localhost:8080/cotacao/salvar`, cotacao);
    }

    getCotacao(grupoCotacaoId: number, selecionada: boolean = false): Observable<Cotacao[]> {
        return this.httpClient.get<Cotacao[]>(`http://localhost:8080/cotacao/listar?grupoCotacao=${grupoCotacaoId}&selecionada=${selecionada}`);
    }

    getCotacaoById(id: number): Observable<Cotacao[]> {
        return this.httpClient.get<Cotacao[]>(`http://localhost:8080/cotacao/listar?id=${id}`);
    }
}