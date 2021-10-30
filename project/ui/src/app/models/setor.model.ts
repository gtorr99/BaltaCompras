import { BaseEntity } from "./base-entity.model";
import { CentroCusto } from "./centro-custo.model";

export class Setor extends BaseEntity {
    descricao: string;
    listaCentroCusto: CentroCusto[];

    constructor(data ?: Partial<Setor>) {
        super();
        Object.assign(this, data);
    }
}