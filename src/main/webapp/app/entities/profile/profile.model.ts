import { BaseEntity } from './../../shared';

export class Profile implements BaseEntity {
    constructor(
        public id?: number,
        public bookmarkedMovies?: BaseEntity[],
        public watchedMovies?: BaseEntity[],
        public ratedMovies?: BaseEntity[],
    ) {
    }
}
