import { UnMedidaEnum } from "./enum/un-medida.enum";
import { BaseEntity } from "@models/base-entity.model";
import { GrupoProduto } from "@models/grupo-produto.model";
import { ListaUnidadeMedida } from "@models/lista-unidade-medida.model";

export class Produto extends BaseEntity {
    descricao: string;
    unMedida: UnMedidaEnum | string;
    grupoProduto: GrupoProduto;

    constructor(data?: Partial<Produto>) {
        super();
        Object.assign(this, data);
        this.grupoProduto = new GrupoProduto(data?.grupoProduto);
    }

    getListaMedidas?(): string[] {
        return new ListaUnidadeMedida().getLista(this.unMedida);
    }
}