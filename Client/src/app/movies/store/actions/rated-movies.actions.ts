import { Action } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import { Page } from '../../models/page.model';

export enum RatedMoviesActionTypes {
    FETCH_RATED_MOVIES = '[MOVIE] Rated Movies fetch',
    FETCH_RATED_MOVIES_SUCCESS = '[MOVIE] Rated Movies fetch Success',
    FETCH_RATED_MOVIES_FAILURE = '[MOVIE] Rated Movies fetch Failure',
    RATE_MOVIE = '[MOVIE] Rated Movie rate',
    RATE_MOVIE_SUCCESS = '[MOVIE] Rated Movie rate Success',
    RATE_MOVIE_FAILURE = '[MOVIE] Rated Movie rate Failure',
    UNRATE_MOVIE = '[MOVIE] Rated Movie unrate',
    UNRATE_MOVIE_SUCCESS = '[MOVIE] Rated Movie unrate Success',
    UNRATE_MOVIE_FAILURE = '[MOVIE] Rated Movie unrate Failure',
    BOOKMARK_RATED_MOVIE = '[MOVIE] Rated Movie bookmark',
    UNBOOKMARK_RATED_MOVIE = '[MOVIE] Rated Movie unbookmark',
    WATCH_RATED_MOVIE = '[MOVIE] Rated Movie watch',
    UNWATCH_RATED_MOVIE = '[MOVIE] Rated Movie unwatch',
}


export class FetchRatedMoviesAction implements Action {
    readonly type = RatedMoviesActionTypes.FETCH_RATED_MOVIES;
    constructor(public payload: any) { }
}

export class FetchRatedMoviesSuccessAction implements Action {
    readonly type = RatedMoviesActionTypes.FETCH_RATED_MOVIES_SUCCESS;
    constructor(public payload: Page<Movie>) { }
}

export class FetchRatedMoviesFailureAction implements Action {
    readonly type = RatedMoviesActionTypes.FETCH_RATED_MOVIES_FAILURE;
    constructor(public payload: any) { }
}
export class RateMovieAction implements Action {
    readonly type = RatedMoviesActionTypes.RATE_MOVIE;
    constructor(public payload: any) { }
}
export class RateMovieSuccessAction implements Action {
    readonly type = RatedMoviesActionTypes.RATE_MOVIE_SUCCESS;
    constructor(public payload: Movie) { }
}
export class RateMovieFailureAction implements Action {
    readonly type = RatedMoviesActionTypes.RATE_MOVIE_FAILURE;
    constructor(public payload: any) { }
}
export class UnRateMovieAction implements Action {
    readonly type = RatedMoviesActionTypes.UNRATE_MOVIE;
    constructor(public payload: any) { }
}
export class UnRateMovieSuccessAction implements Action {
    readonly type = RatedMoviesActionTypes.UNRATE_MOVIE_SUCCESS;
    constructor(public payload: Movie) { }
}
export class UnRateMovieFailureAction implements Action {
    readonly type = RatedMoviesActionTypes.UNRATE_MOVIE_FAILURE;
    constructor(public payload: any) { }
}
export class BookmarkRatedMovieAction implements Action {
    readonly type = RatedMoviesActionTypes.BOOKMARK_RATED_MOVIE;
    constructor(public payload: any) { }
}
export class UnBookmarkRatedMovieAction implements Action {
    readonly type = RatedMoviesActionTypes.UNBOOKMARK_RATED_MOVIE;
    constructor(public payload: any) { }
}
export class WatchRatedMovieAction implements Action {
    readonly type = RatedMoviesActionTypes.WATCH_RATED_MOVIE;
    constructor(public payload: any) { }
}
export class UnWatchRatedMovieAction implements Action {
    readonly type = RatedMoviesActionTypes.UNWATCH_RATED_MOVIE;
    constructor(public payload: any) { }
}

export type RatedMoviesActionUnion
    = FetchRatedMoviesAction
    | FetchRatedMoviesSuccessAction
    | FetchRatedMoviesFailureAction
    | RateMovieAction
    | RateMovieSuccessAction
    | RateMovieFailureAction
    | UnRateMovieAction
    | UnRateMovieSuccessAction
    | UnRateMovieFailureAction
    | BookmarkRatedMovieAction
    | UnBookmarkRatedMovieAction
    | WatchRatedMovieAction
    | UnWatchRatedMovieAction
    ;
