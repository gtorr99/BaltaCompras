import { UnMedidaEnum } from "./enum/un-medida.enum";

export class ListaUnidadeMedida {
    getLista(unMedida: UnMedidaEnum | string): string[] {
        switch(unMedida) {
            case UnMedidaEnum.L:
            case 'L':
                return ["L", "ml"];
            case UnMedidaEnum.g:
            case 'g':
                return ["Kg", "g", "mg"];
            case UnMedidaEnum.m:
            case 'm':
                return ["m", "cm", "mm"];
            case 'un':
                return ["un"];
            default:
                return [];
        }
    }
}