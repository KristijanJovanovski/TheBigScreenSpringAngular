import { BaseEntity } from './../../shared';

export const enum Gender {
    'NONE',
    'FEMALE',
    'MALE'
}

export class People implements BaseEntity {
    constructor(
        public id?: number,
        public imdbId?: string,
        public name?: string,
        public gender?: Gender,
        public biography?: string,
        public popularity?: number,
        public adult?: boolean,
        public birthday?: any,
        public placeOfBirth?: string,
        public profilePath?: string,
        public deathday?: any,
        public casts?: BaseEntity[],
        public crews?: BaseEntity[],
        public tmdbImages?: BaseEntity[],
    ) {
        this.adult = false;
    }
}
