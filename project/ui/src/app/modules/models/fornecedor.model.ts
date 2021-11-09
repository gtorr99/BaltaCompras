import { BaseEntity } from "@models/base-entity.model";
import { GrupoProduto } from "@models/grupo-produto.model";
import { StatusEnum } from "./enum/status.enum";

export class Fornecedor extends BaseEntity {
    cnpj: string;
    inscricaoEstadual: string;
    razaoSocial: string;
    nomeFantasia: string;
    status: StatusEnum;
    email: string;
    telefone: string;
    cep: string;
    rua: string;
    numero: number;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    gruposProduto: GrupoProduto[];

    constructor(data?: Partial<Fornecedor>) {
        super();
        Object.assign(this, data);
    }
}
