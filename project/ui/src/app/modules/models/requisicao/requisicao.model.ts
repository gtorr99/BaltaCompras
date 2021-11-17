import { BaseEntity } from "@models/base-entity.model";
import { CentroCusto } from "@models/centro-custo.model";
import { RequisicaoProduto } from "./requisicao-produto.model";
import { StatusEnum } from "../enum/status.enum";
import { Usuario } from "@models/usuario.model";
import { Produto } from "@models/produto.model";

export class Requisicao extends BaseEntity {
    data: Date;
    prazo: Date;
    observacoes: string;
    status: StatusEnum | string;
    usuario: Usuario;
    centroCusto: CentroCusto;
    produtos: RequisicaoProduto[];

    constructor(data?: Partial<Requisicao>) {
        super();
        Object.assign(this, data);
    }
}