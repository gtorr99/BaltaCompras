import { BaseEntity } from "@models/base-entity.model";
import { CentroCusto } from "@models/centro-custo.model";
import { RequisicaoProduto } from "@models/requisicao-produto.model";
import { StatusEnum } from "./enum/status.enum";
import { Usuario } from "@models/usuario.model";

export class Requisicao extends BaseEntity {
    data: Date;
    prazoSolicitado: Date;
    status: StatusEnum;
    observacoes: string;
    usuario: Usuario;
    centroCusto: CentroCusto;
    produtos: RequisicaoProduto[];

    constructor(data?: Partial<Requisicao>) {
        super();
        Object.assign(this, data);
    }
}