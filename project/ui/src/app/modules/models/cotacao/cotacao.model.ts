import { StatusEnum, UnMedidaEnum } from "../enum";
import { BaseEntity } from "@models/base-entity.model";
import { Fornecedor } from "@models/fornecedor.model";

export class Cotacao extends BaseEntity {
    fornecedor: Fornecedor;
    frete: number;
    desconto: number;
    prazo: Date;
    prazoFornecedor: Date;
    selecionada: boolean;
    transportadora: string;
    meioTransporte: string;
    formasPgto: string[];
    status: StatusEnum | string;
    observacoes?: string;
    produtos: {
        id: number
        descricao: string,
        quantidade: number,
        unMedida: UnMedidaEnum | string,
        precoUnitario: number,
        aliqIpi: number,
        subtotal: number
    }[];
    total?: number;

    constructor(data?: Partial<Cotacao>) {
        super();
        Object.assign(this, data);
    }
}