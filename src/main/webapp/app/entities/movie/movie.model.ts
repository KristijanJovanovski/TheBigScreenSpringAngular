import { BaseEntity } from './../../shared';

export const enum Status {
    'RUMORED',
    'PLANNED',
    'IN_PRODUCTION',
    'POST_PRODUCTION',
    'RELEASED',
    'CANCELED'
}

export class Movie implements BaseEntity {
    constructor(
        public id?: number,
        public imdbId?: string,
        public backdropPath?: string,
        public posterPath?: string,
        public originalTitle?: string,
        public title?: string,
        public originalLanguage?: string,
        public voteAverage?: number,
        public popularity?: number,
        public voteCount?: number,
        public budget?: number,
        public runtime?: number,
        public revenue?: number,
        public releaseDate?: string,
        public overview?: string,
        public status?: Status,
        public bookmarkedMovies?: BaseEntity[],
        public watchedMovies?: BaseEntity[],
        public ratedMovies?: BaseEntity[],
        public videos?: BaseEntity[],
        public casts?: BaseEntity[],
        public crews?: BaseEntity[],
        public tmdbImages?: BaseEntity[],
        public genres?: BaseEntity[],
        public keywords?: BaseEntity[],
    ) {
    }
}
