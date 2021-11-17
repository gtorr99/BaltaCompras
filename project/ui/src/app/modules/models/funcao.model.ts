import { BaseEntity } from "@models/base-entity.model";
import { Permissao } from "@models/permissao.model";

export class Funcao extends BaseEntity {
    descricao: string;
    permissoes: Permissao[];

    constructor(data?: Partial<Funcao>) {
        super();
        Object.assign(this, data);
        this.permissoes = [...data?.permissoes.map(p => new Permissao(p))];
    }
}