import { BaseEntity } from "@models/base-entity.model";
import { RequisicaoProduto } from "@models/requisicao/requisicao-produto.model";

export class GrupoCotacaoProduto extends BaseEntity {
    quantidadeTotal: number;
    requisicaoProduto: RequisicaoProduto[];

    constructor(data?: Partial<GrupoCotacaoProduto>) {
        super();
        Object.assign(this, data);
    }
}