import { Action } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import { Page } from '../../models/page.model';

export enum TopRatedMoviesActionTypes {
    FETCH_TOP_RATED_MOVIES = '[MOVIE] TopRated Movies fetch',
    FETCH_TOP_RATED_MOVIES_SUCCESS = '[MOVIE] TopRated Movies fetch Success',
    FETCH_TOP_RATED_MOVIES_FAILURE = '[MOVIE] TopRated Movies fetch Failure',
    BOOKMARK_TOP_RATED_MOVIE = '[MOVIE] TopRated Movie bookmark',
    UNBOOKMARK_TOP_RATED_MOVIE = '[MOVIE] TopRated Movie unbookmark',
    WATCH_TOP_RATED_MOVIE = '[MOVIE] TopRated Movie watch',
    UNWATCH_TOP_RATED_MOVIE = '[MOVIE] TopRated Movie unwatch',
    RATE_TOP_RATED_MOVIE = '[MOVIE] TopRated Movie rate',
    UNRATE_TOP_RATED_MOVIE = '[MOVIE] TopRated Movie unrate',
}


export class FetchTopRatedMoviesAction implements Action {
    readonly type = TopRatedMoviesActionTypes.FETCH_TOP_RATED_MOVIES;
    constructor(public payload: number) { }
}

export class FetchTopRatedMoviesSuccessAction implements Action {
    readonly type = TopRatedMoviesActionTypes.FETCH_TOP_RATED_MOVIES_SUCCESS;
    constructor(public payload: Page<Movie>) { }
}

export class FetchTopRatedMoviesFailureAction implements Action {
    readonly type = TopRatedMoviesActionTypes.FETCH_TOP_RATED_MOVIES_FAILURE;
    constructor(public payload: any) { }
}
export class BookmarkTopRatedMovieAction implements Action {
    readonly type = TopRatedMoviesActionTypes.BOOKMARK_TOP_RATED_MOVIE;
    constructor(public payload: any) { }
}
export class UnBookmarkTopRatedMovieAction implements Action {
    readonly type = TopRatedMoviesActionTypes.UNBOOKMARK_TOP_RATED_MOVIE;
    constructor(public payload: any) { }
}
export class WatchTopRatedMovieAction implements Action {
    readonly type = TopRatedMoviesActionTypes.WATCH_TOP_RATED_MOVIE;
    constructor(public payload: any) { }
}
export class UnWatchTopRatedMovieAction implements Action {
    readonly type = TopRatedMoviesActionTypes.UNWATCH_TOP_RATED_MOVIE;
    constructor(public payload: any) { }
}
export class RateTopRatedMovieAction implements Action {
    readonly type = TopRatedMoviesActionTypes.RATE_TOP_RATED_MOVIE;
    constructor(public payload: any) { }
}
export class UnRateTopRatedMovieAction implements Action {
    readonly type = TopRatedMoviesActionTypes.UNRATE_TOP_RATED_MOVIE;
    constructor(public payload: any) { }
}

export type TopRatedMoviesActionUnion
    = FetchTopRatedMoviesAction
    | FetchTopRatedMoviesSuccessAction
    | FetchTopRatedMoviesFailureAction
    | BookmarkTopRatedMovieAction
    | UnBookmarkTopRatedMovieAction
    | WatchTopRatedMovieAction
    | UnWatchTopRatedMovieAction
    | RateTopRatedMovieAction
    | UnRateTopRatedMovieAction
    ;
