import { StatusEnum, UnMedidaEnum } from "../enum";
import { BaseEntity } from "@models/base-entity.model";
import { Fornecedor } from "@models/fornecedor.model";
import { GrupoCotacaoProdutoCotacao } from "./grupo-cotacao-produto-cotacao.model";
import { GrupoCotacao } from "..";

export class Cotacao extends BaseEntity {
    fornecedor: Fornecedor;
    frete: number | string;
    desconto: number | string;
    prazo: Date;
    selecionada: boolean;
    transportadora: string;
    meioTransporte: string;
    formasPgto: string;
    status: StatusEnum | string;
    observacoes: string;
    produtos: GrupoCotacaoProdutoCotacao[];
    grupoCotacao?: GrupoCotacao;

    constructor(data?: Partial<Cotacao>) {
        super();
        Object.assign(this, data);
    }
}