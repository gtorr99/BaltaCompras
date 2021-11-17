import { Produto } from "@models/produto.model";
import { RequisicaoProduto } from "./requisicao-produto.model";

export class ProdutoSelecionado {
    requisicaoProduto: RequisicaoProduto;
    isChecked: boolean;
    inputVermelhoSeQuantidadeZero: boolean;
    medidaSelecionada?: string;

    constructor(data?: Partial<ProdutoSelecionado>) {
        if (data?.requisicaoProduto) {
            data.requisicaoProduto.produto = new Produto(data?.requisicaoProduto.produto);
            this.requisicaoProduto = data.requisicaoProduto;
            this.medidaSelecionada = this.requisicaoProduto.produto.getListaMedidas()[0];
        }
        this.isChecked = data?.isChecked ?? false;
        this.inputVermelhoSeQuantidadeZero = false;
    }
}