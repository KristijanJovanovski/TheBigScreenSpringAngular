import { BaseEntity } from './../../shared';

export class Keyword implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public movies?: BaseEntity[],
    ) {
    }
}
