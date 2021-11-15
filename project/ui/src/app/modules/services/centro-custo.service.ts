import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service.service';
import { CentroCusto } from '@models/centro-custo.model';

@Injectable({ providedIn: 'root' })
export class CentroCustoService extends BaseService<CentroCusto> {
    constructor(protected httpClient: HttpClient) { 
        super(httpClient, 'centro-custo');
    }
}