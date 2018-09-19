import { BaseEntity } from './../../shared';

export class MovieCrew implements BaseEntity {
    constructor(
        public id?: number,
        public job?: string,
        public department?: string,
        public movieId?: number,
        public peopleId?: number,
    ) {
    }
}
