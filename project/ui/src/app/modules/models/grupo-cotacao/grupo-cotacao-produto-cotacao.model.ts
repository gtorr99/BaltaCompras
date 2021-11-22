import { GrupoCotacaoProduto } from "./grupo-cotacao-produto.model";

export class GrupoCotacaoProdutoCotacao {
    id: { idCotacao: number, idGrupoCotacaoProduto: number };
    aliquotaIpi: number;
    precoUnitario: number;
    disponivel: boolean;
    grupoCotacaoProduto: GrupoCotacaoProduto;
    inputing?: boolean;

    constructor(data?: Partial<GrupoCotacaoProdutoCotacao>) {
        Object.assign(this, data);
    }
}