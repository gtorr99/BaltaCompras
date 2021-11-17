import { BaseEntity } from "@models/base-entity.model";
import { Funcao } from "@models/funcao.model";
import { Setor } from "@models/setor.model";
import { StatusEnum } from "./enum/status.enum";

export class Usuario extends BaseEntity {
    nome: string;
    email: string;
    hashSenha: string;
    status: StatusEnum | string;
    setor: Setor;
    funcao: Funcao;

    constructor(data?: Partial<Usuario>) {
        super();
        Object.assign(this, data);
    }
}