import { BaseEntity } from "./base-entity.model";
import { Funcao } from "./funcao.model";
import { Setor } from "./setor.model";
import { StatusEnum } from "../enum/status.enum";

export class Usuario extends BaseEntity {
    nome: string;
    email: string;
    status: StatusEnum;
    setor: Setor;
    funcao: Funcao;

    constructor(data?: Partial<Usuario>) {
        super();
        Object.assign(this, data);
    }
}