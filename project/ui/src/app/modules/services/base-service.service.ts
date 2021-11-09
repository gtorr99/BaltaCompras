import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fornecedor } from '@models/fornecedor.model';
import { BaseEntity } from '@models/base-entity.model';
import { Page } from '@models/page.model';
import { Observable } from 'rxjs';
import { Email } from '@models/email.model';

const baseUrl = "http://localhost:4200";
const pageSize = 10;
const page = 0;

@Injectable({ providedIn: 'root' })
export abstract class BaseService<T extends BaseEntity> {
    constructor(
        protected httpClient: HttpClient,
        @Inject('') protected resourceUrl: string
    ) { }

    listar(): Observable<Page<T>> {
        return this.httpClient.get<Page<T>>(`${baseUrl}/${this.resourceUrl}/listar?page=${page}&size=${pageSize}`);
    }

    filtrar(query: string): Observable<Page<T>> {
        return this.httpClient.get<Page<T>>(`${baseUrl}/${this.resourceUrl}/filtrar?page=${page}&size=${pageSize}&${query}`);
    }

    salvar(resource: T): Observable<any> {
        return this.httpClient.post<T>(`${baseUrl}/${this.resourceUrl}/salvar`, resource);
    }

    alterar(resource: T): Observable<any> {
        return this.httpClient.put<T>(`${baseUrl}/${this.resourceUrl}/alterar`, resource);
    }

    excluir(id: number): Observable<any> {
        return this.httpClient.delete(`${baseUrl}/${this.resourceUrl}/excluir/${id}`);
    }

    enviarEmail(email: Email, id: number = null): Observable<any> {
        return this.httpClient.put(`${baseUrl}/${this.resourceUrl}/enviar-email/${id}`, email);
    }
}