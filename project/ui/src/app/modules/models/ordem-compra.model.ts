import { StatusEnum } from "./enum/status.enum";
import { Cotacao } from "@models/cotacao.model";
import { Usuario } from "@models/usuario.model";
import { BaseEntity } from "@models/base-entity.model";
import { TipoCompraEnum } from "./enum/tipo-compra.enum";

export class OrdemCompra extends BaseEntity {
    data: Date;
    tipoCompra: TipoCompraEnum;
    status: StatusEnum;
    observacoes?: string;
    cotacao: Cotacao;
    usuario: Usuario;

    constructor(data?: Partial<OrdemCompra>) {
        super();
        Object.assign(this, data);
    }
}