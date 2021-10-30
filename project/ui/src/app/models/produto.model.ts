import { UnMedidaEnum } from "app/enum/un-medida.enum";
import { BaseEntity } from "./base-entity.model";
import { GrupoProduto } from "./grupo-produto.model";
import { ListUnidadeMedida } from "./lista-unidade-medida.model";

export class Produto extends BaseEntity {
    descricao: string;
    unMedida: UnMedidaEnum;
    grupoProduto: GrupoProduto;

    constructor(data?: Partial<Produto>) {
        super();
        Object.assign(this, data);
    }

    getListaMedidas?(): string[] {
        return new ListUnidadeMedida().getLista(this.unMedida);
    }
}