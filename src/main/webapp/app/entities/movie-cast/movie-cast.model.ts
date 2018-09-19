import { BaseEntity } from './../../shared';

export class MovieCast implements BaseEntity {
    constructor(
        public id?: number,
        public movieRole?: string,
        public castOrder?: number,
        public movieId?: number,
        public peopleId?: number,
    ) {
    }
}
