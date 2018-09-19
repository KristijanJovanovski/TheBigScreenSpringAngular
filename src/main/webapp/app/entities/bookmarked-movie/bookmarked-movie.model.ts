import { BaseEntity } from './../../shared';

export class BookmarkedMovie implements BaseEntity {
    constructor(
        public id?: number,
        public createdOn?: any,
        public movieId?: number,
        public userId?: number,
    ) {
    }
}
