import { Usuario } from "@models/usuario.model";
import { BaseEntity } from "@models/base-entity.model";
import { StatusEnum } from "@models/enum";
import { Fornecedor } from "@models/fornecedor.model";
import { GrupoProduto } from "@models/grupo-produto.model";
import { Cotacao, GrupoCotacao } from "..";

export class GrupoCotacaoProduto extends BaseEntity {
    quantidadeTotal: number;
    grupoCotacao: GrupoCotacao;

    constructor(data?: Partial<GrupoCotacao>) {
        super();
        Object.assign(this, data);
    }
}