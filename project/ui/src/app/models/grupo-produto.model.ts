import { BaseEntity } from "./base-entity.model";

export class GrupoProduto extends BaseEntity {
    descricao: string;

    constructor(data?: Partial<GrupoProduto>) {
        super();
        Object.assign(this, data);
    }
}