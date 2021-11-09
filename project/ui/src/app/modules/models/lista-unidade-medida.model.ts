import { UnMedidaEnum } from "./enum/un-medida.enum";

export class ListUnidadeMedida {
    getLista(unMedida: UnMedidaEnum): string[] {
        switch(unMedida) {
            case UnMedidaEnum.L:
                return ["L", "ml"];
            case UnMedidaEnum.g:
                return ["Kg", "g", "mg"];
            case UnMedidaEnum.m:
                return ["m", "cm", "mm"];
            case UnMedidaEnum.unidade:
                return ["un"];
        }
    }
}