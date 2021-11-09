import { BaseEntity } from "@models/base-entity.model";

export class FormaPagamento extends BaseEntity {
    descricao: string;

    constructor(data?: Partial<FormaPagamento>) {
        super();
        Object.assign(this, data);
    }
}