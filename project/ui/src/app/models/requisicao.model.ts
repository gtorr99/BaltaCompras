import { BaseEntity } from "./base-entity.model";
import { CentroCusto } from "./centro-custo.model";
import { RequisicaoProduto } from "./requisicao-produto.model";
import { StatusEnum } from "../enum/status.enum";
import { Usuario } from "./usuario.model";

export class Requisicao extends BaseEntity {
    data: Date;
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