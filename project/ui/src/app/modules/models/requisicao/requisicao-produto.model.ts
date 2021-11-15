import { BaseEntity } from "@models/base-entity.model";
import { UnMedidaEnum } from "@models/enum";
import { Produto } from "@models/produto.model";

export class RequisicaoProduto extends BaseEntity {
    produto: Produto;
    quantidade: number;
    grupoCotacaoProduto?: number;

    constructor(data?: Partial<RequisicaoProduto>) {
        super();
        Object.assign(this, data);
        this.produto = new Produto(data?.produto);
    }

    converterQuantidadeParaUnMedidaPadrao(un: string) {
        switch(this.produto.unMedida) {
            case UnMedidaEnum.L:
                if (un != 'L') {
                    this.quantidade = this.quantidade / 1000;
                }
                break;
            case UnMedidaEnum.g:
                if (un != 'g') {
                    if (un == 'Kg') {
                        console.log("Hey kg");
                        this.quantidade = this.quantidade * 1000;
                    } else if (un == 'mg') {
                        this.quantidade = this.quantidade / 1000;
                    }
                }
                break;
            case UnMedidaEnum.m:
                if (un != 'm') {
                    if (un == 'cm') {
                        console.log("Hey cm");
                        this.quantidade = this.quantidade / 1000;
                    } else if (un == 'mm') {
                        this.quantidade = this.quantidade / 10000;
                    }
                }
                break;
            default:
                break;
        }
    }
}