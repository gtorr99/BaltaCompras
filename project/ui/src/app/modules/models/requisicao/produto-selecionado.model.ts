import { RequisicaoProduto } from "./requisicao-produto.model";

export class ProdutoSelecionado {
    requisicaoProduto: RequisicaoProduto;
    isChecked: boolean;
    inputVermelhoSeQuantidadeZero: boolean;
    medidaSelecionada?: string;

    constructor(produto: RequisicaoProduto) {
        this.requisicaoProduto = produto;
        this.isChecked = false;
        this.inputVermelhoSeQuantidadeZero = false;
        this.medidaSelecionada = this.requisicaoProduto.produto.getListaMedidas()[0];
    }
}