import { Usuario } from "@models/usuario.model";
import { BaseEntity } from "@models/base-entity.model";
import { StatusEnum } from "@models/enum";
import { GrupoProduto } from "@models/grupo-produto.model";
import { Cotacao } from "..";
import { GrupoCotacaoProduto } from "./grupo-cotacao-produto.model";

export class GrupoCotacao extends BaseEntity {
    data: Date;
    prazoSolicitado: Date;
    observacoes?: string;
    usuario: Usuario;
    status: StatusEnum | string;
    grupoProduto: GrupoProduto;
    cotacoes: Cotacao[];
    grupoCotacaoProdutos: GrupoCotacaoProduto[];

    constructor(data?: Partial<GrupoCotacao>) {
        super();
        Object.assign(this, data);
    }
}