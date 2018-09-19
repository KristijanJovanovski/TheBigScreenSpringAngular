import { BaseEntity } from './../../shared';

export const enum ImageType {
    'PROFILE',
    'POSTER',
    'BACKDROP'
}

export class TmdbImage implements BaseEntity {
    constructor(
        public id?: number,
        public aspectRatio?: number,
        public filepath?: string,
        public height?: number,
        public iso6391?: string,
        public width?: number,
        public imageType?: ImageType,
        public movieId?: number,
        public peopleId?: number,
    ) {
    }
}
