export * from './popular-movies.actions';
export * from './top-rated-movies.actions';
export * from './bookmarked-movies.actions';
export * from './watched-movies.actions';
export * from './rated-movies.actions';
export * from './movie-details.actions';

import * as PopularMoviesActionUnion from './popular-movies.actions';
import * as TopRatedMoviesActionUnion from './top-rated-movies.actions';
import * as BookmarkedMoviesActionUnion from './bookmarked-movies.actions';
import * as WatchedMoviesActionUnion from './watched-movies.actions';
import * as RatedMoviesActionUnion from './rated-movies.actions';
import * as MovieDetailsActionUnion from './movie-details.actions';

export const MovieActions = {
    PopularMoviesActionUnion,
    TopRatedMoviesActionUnion,
    BookmarkedMoviesActionUnion,
    WatchedMoviesActionUnion,
    RatedMoviesActionUnion,
    MovieDetailsActionUnion,
};
