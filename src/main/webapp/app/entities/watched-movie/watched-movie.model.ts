import { BaseEntity } from './../../shared';

export class WatchedMovie implements BaseEntity {
    constructor(
        public id?: number,
        public createdOn?: any,
        public times?: number,
        public movieId?: number,
        public userId?: number,
    ) {
    }
}
