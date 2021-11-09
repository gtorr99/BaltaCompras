import { StatusEnum } from "./enum";
import { BaseEntity } from "@models/base-entity.model";

export class Cotacao extends BaseEntity {
    frete: number;
    desconto: number;
    prazo: Date;
    selecionada: boolean;
    transportadora: string;
    meioTransporte: string;
    status: StatusEnum;
    observacoes?: string;

    constructor(data?: Partial<Cotacao>) {
        super();
        Object.assign(this, data);
    }
}