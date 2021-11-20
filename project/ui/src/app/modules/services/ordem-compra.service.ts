import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service.service';
import { Observable } from 'rxjs';
import { OrdemCompra } from '@models/ordem-compra.model';

@Injectable({ providedIn: 'root' })
export class OrdemCompraService extends BaseService<OrdemCompra> {
    constructor(protected httpClient: HttpClient) { 
        super(httpClient, 'ordem-compra');
    }

    cancelar(id: number): Observable<boolean> {
        return this.httpClient.put<boolean>(`http://localhost:8080/ordem-compra/cancelar/${id}`, null);
    }

    aprovar(id: number): Observable<any> {
        return this.httpClient.put<any>(`http://localhost:8080/ordem-compra/aprovar/${id}`, null);
    }

    reprovar(id: number): Observable<any> {
        return this.httpClient.put<any>(`http://localhost:8080/ordem-compra/reprovar/${id}`, null);
    }
}