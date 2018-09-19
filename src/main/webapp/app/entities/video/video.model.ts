import { BaseEntity } from './../../shared';

export const enum VideoType {
    'TRAILER',
    'TEASER',
    'CLIP',
    'FEATURETTE'
}

export class Video implements BaseEntity {
    constructor(
        public id?: number,
        public videoKey?: string,
        public name?: string,
        public videoSite?: string,
        public videoSize?: number,
        public videoType?: VideoType,
        public movieId?: number,
    ) {
    }
}
