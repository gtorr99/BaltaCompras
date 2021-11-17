import { Usuario } from "@models/usuario.model";
import { BaseEntity } from "@models/base-entity.model";
import { StatusEnum } from "@models/enum";
import { Fornecedor } from "@models/fornecedor.model";
import { GrupoProduto } from "@models/grupo-produto.model";
import { Cotacao } from "..";

export class GrupoCotacao extends BaseEntity {
    data: Date;
    prazo: Date;
    observacoes?: string;
    usuario: Usuario;
    status: StatusEnum | string;
    fornecedorSelecionado?: Fornecedor;
    grupoProduto: GrupoProduto;
    cotacoes?: Cotacao[];

    constructor(data?: Partial<GrupoCotacao>) {
        super();
        Object.assign(this, data);
    }
}