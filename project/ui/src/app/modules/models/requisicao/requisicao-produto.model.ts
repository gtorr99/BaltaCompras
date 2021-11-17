import { GrupoCotacaoProduto } from "@models/cotacao/grupo-cotacao-produto.model";
import { UnMedidaEnum } from "@models/enum";
import { Produto } from "@models/produto.model";

export class RequisicaoProduto {
    id: { idRequisicao: number, idProduto: number };
    produto: Produto;
    quantidade: number;
    grupoCotacaoProduto?: GrupoCotacaoProduto;

    constructor(data?: Partial<RequisicaoProduto>) {
        Object.assign(this, data);
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