import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service.service';
import { Setor } from '@models/setor.model';

@Injectable({ providedIn: 'root' })
export class SetorService extends BaseService<Setor> {
    constructor(protected httpClient: HttpClient) { 
        super(httpClient, 'setor');
    }
}