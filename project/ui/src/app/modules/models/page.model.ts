import { BaseEntity } from ".";

export class Page<T extends BaseEntity> {
    page: number = 0;
    size: number = 0;
    totalPages: number = 0;
    totalElements: number = 0;
    content: T[];
}