import { BaseEntity } from "@models/base-entity.model";

export class Permissao extends BaseEntity {
    descricao: string;

    constructor(data?: Partial<Permissao>) {
        super();
        Object.assign(this, data);
    }
}