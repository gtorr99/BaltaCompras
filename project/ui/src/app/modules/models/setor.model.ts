import { BaseEntity } from "@models/base-entity.model";
import { CentroCusto } from "@models/centro-custo.model";

export class Setor extends BaseEntity {
    descricao: string;
    centrosCusto?: CentroCusto[];

    constructor(data ?: Partial<Setor>) {
        super();
        Object.assign(this, data);
        if (this.centrosCusto) {
            this.centrosCusto = [...data?.centrosCusto.map(cc => new CentroCusto(cc))];
        }
    }
}