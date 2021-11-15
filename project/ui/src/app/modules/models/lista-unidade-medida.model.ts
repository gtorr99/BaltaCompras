import { UnMedidaEnum } from "./enum/un-medida.enum";

export class ListaUnidadeMedida {
    getLista(unMedida: UnMedidaEnum): string[] {
        switch(unMedida) {
            case UnMedidaEnum.L:
                return ["L", "ml"];
            case UnMedidaEnum.g:
                return ["Kg", "g", "mg"];
            case UnMedidaEnum.m:
                return ["m", "cm", "mm"];
            case UnMedidaEnum.un:
                return ["un"];
        }
    }
}