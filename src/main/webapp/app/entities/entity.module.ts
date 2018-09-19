import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TheBigScreenProfileModule } from './profile/profile.module';
import { TheBigScreenMovieModule } from './movie/movie.module';
import { TheBigScreenBookmarkedMovieModule } from './bookmarked-movie/bookmarked-movie.module';
import { TheBigScreenWatchedMovieModule } from './watched-movie/watched-movie.module';
import { TheBigScreenRatedMovieModule } from './rated-movie/rated-movie.module';
import { TheBigScreenGenreModule } from './genre/genre.module';
import { TheBigScreenVideoModule } from './video/video.module';
import { TheBigScreenKeywordModule } from './keyword/keyword.module';
import { TheBigScreenPeopleModule } from './people/people.module';
import { TheBigScreenMovieCastModule } from './movie-cast/movie-cast.module';
import { TheBigScreenMovieCrewModule } from './movie-crew/movie-crew.module';
import { TheBigScreenTmdbImageModule } from './tmdb-image/tmdb-image.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TheBigScreenProfileModule,
        TheBigScreenMovieModule,
        TheBigScreenBookmarkedMovieModule,
        TheBigScreenWatchedMovieModule,
        TheBigScreenRatedMovieModule,
        TheBigScreenGenreModule,
        TheBigScreenVideoModule,
        TheBigScreenKeywordModule,
        TheBigScreenPeopleModule,
        TheBigScreenMovieCastModule,
        TheBigScreenMovieCrewModule,
        TheBigScreenTmdbImageModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TheBigScreenEntityModule {}
