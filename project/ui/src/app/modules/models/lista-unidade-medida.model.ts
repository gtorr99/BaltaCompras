import { UnMedidaEnum } from "./enum/un-medida.enum";

export class ListaUnidadeMedida {
    getLista(unMedida: UnMedidaEnum | string): string[] {
        switch(unMedida) {
            case 'un':
            case UnMedidaEnum.un:
                return ["un"];
            case UnMedidaEnum.L:
            case 'L':
            case 1:
                return ["L", "ml"];
            case UnMedidaEnum.g:
            case 'g':
                return ["Kg", "g", "mg"];
            case UnMedidaEnum.m:
            case 'm':
                return ["m", "cm", "mm"];
            
            default:
                return [];
        }
    }
}