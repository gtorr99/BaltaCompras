export class Filtro {
    atributo: Atributo;
    parametro: string;
    valor: string;
    parametros?: { nome: string, id: string }[];
    statusOptions?: string[];

    constructor(data?: Partial<Filtro>) {
        Object.assign(this, data);
    }
}

export enum TipoFiltro {
    STRING = 0,
    NUMBER,
    DATE,
    STATUS
}

export class Atributo {
    nome: string;
    atributo: string;
    tipo: TipoFiltro;
}