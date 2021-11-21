import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Fornecedor } from '@models/fornecedor.model';
import { BaseEntity } from '@models/base-entity.model';
import { Page } from '@models/page.model';
import { Observable } from 'rxjs';
import { Email } from '@models/email.model';

const baseUrl = "http://localhost:8080";
const pageSize = 10;
@Injectable({ providedIn: 'root' })
export abstract class BaseService<T extends BaseEntity> {
    constructor(
        protected httpClient: HttpClient,
        @Inject('') protected resourceUrl: string
    ) { }

    listar(query: string = ''): Observable<T[]> {
        return this.httpClient.get<T[]>(`${baseUrl}/${this.resourceUrl}/listar?${query}`);
    }

    listarPaginado(query: string = '', page: number = 0): Observable<Page<T>> {
        return this.httpClient.get<Page<T>>(`${baseUrl}/${this.resourceUrl}/listar-paginado?page=${page}&size=${pageSize}&${query}`);
    }

    salvar(resource: T): Observable<any> {
        return this.httpClient.post<T>(`${baseUrl}/${this.resourceUrl}/salvar`, resource);
    }

    alterar(resource: T): Observable<any> {
        return this.httpClient.put<T>(`${baseUrl}/${this.resourceUrl}/alterar`, resource);
    }

    excluir(id: number): Observable<boolean> {
        return this.httpClient.delete<boolean>(`${baseUrl}/${this.resourceUrl}/excluir/${id}`);
    }

    enviarEmail(link: string, destinatarios: string, mensagem: string, assunto: string): Observable<any> {
        return this.httpClient.post<any>(`${baseUrl}/${this.resourceUrl}/email?link=${link}&destinatarios=${destinatarios}&mensagem=${mensagem}&assunto=${assunto}`, null);
    }
}