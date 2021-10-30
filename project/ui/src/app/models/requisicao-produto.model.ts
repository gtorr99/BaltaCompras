import { BaseEntity } from "./base-entity.model";
import { Produto } from "./produto.model";

export class RequisicaoProduto extends BaseEntity {
    produto: Produto;
    quantidade: number;
    grupoCotacaoProduto?: number;

    constructor(data?: Partial<RequisicaoProduto>) {
        super();
        Object.assign(this, data);
    }
}