import { BaseEntity } from "./base-entity.model";
import { Setor } from "./setor.model";

export class CentroCusto extends BaseEntity {
    descricao: string;
    setor: Setor;
    
    constructor(data?: Partial<CentroCusto>) {
        super();
        Object.assign(this, data);
    }
}