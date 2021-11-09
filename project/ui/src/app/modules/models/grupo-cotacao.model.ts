import { Usuario } from "@models/usuario.model";
import { BaseEntity } from "@models/base-entity.model";

export class GrupoCotacao extends BaseEntity {
    data: Date;
    prazoSolicitado: Date;
    observacoes?: string;
    usuario: Usuario;

    constructor(data?: Partial<GrupoCotacao>) {
        super();
        Object.assign(this, data);
    }
}