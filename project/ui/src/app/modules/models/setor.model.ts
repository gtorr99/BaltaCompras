import { BaseEntity } from "@models/base-entity.model";
import { CentroCusto } from "@models/centro-custo.model";

export class Setor extends BaseEntity {
    descricao: string;
    centroCusto: CentroCusto[];

    constructor(data ?: Partial<Setor>) {
        super();
        Object.assign(this, data);
    }
}