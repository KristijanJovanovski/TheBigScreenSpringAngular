import { BaseEntity } from './../../shared';

export class RatedMovie implements BaseEntity {
    constructor(
        public id?: number,
        public createdOn?: any,
        public rate?: number,
        public movieId?: number,
        public userId?: number,
    ) {
    }
}
