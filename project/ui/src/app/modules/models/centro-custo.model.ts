import { BaseEntity } from "@models/base-entity.model";
import { Setor } from "@models/setor.model";

export class CentroCusto extends BaseEntity {
    descricao: string;
    valorGasto?: number;
    valorLimite?: number;
    setor: Setor;
    
    constructor(data?: Partial<CentroCusto>) {
        super();
        Object.assign(this, data);
    }
}