import { BaseEntity } from "./base-entity.model";
import { Permissao } from "./permissao.model";

export class Funcao extends BaseEntity {
    descricao: string;
    permissoes: Permissao[];

    constructor(data?: Partial<Funcao>) {
        super();
        Object.assign(this, data);
    }
}