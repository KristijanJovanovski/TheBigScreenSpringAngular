import { Action } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import { Page } from '../../models/page.model';

export enum WatchedMoviesActionTypes {
    FETCH_WATCHED_MOVIES = '[MOVIE] Watched Movies fetch',
    FETCH_WATCHED_MOVIES_SUCCESS = '[MOVIE] Watched Movies fetch Success',
    FETCH_WATCHED_MOVIES_FAILURE = '[MOVIE] Watched Movies fetch Failure',
    WATCH_MOVIE = '[MOVIE] Watched Movie watch',
    WATCH_MOVIE_SUCCESS = '[MOVIE] Watched Movie watch Success',
    WATCH_MOVIE_FAILURE = '[MOVIE] Watched Movie watch Failure',
    UNWATCH_MOVIE = '[MOVIE] Watched Movie unwatch',
    UNWATCH_MOVIE_SUCCESS = '[MOVIE] Watched Movie unwatch Success',
    UNWATCH_MOVIE_FAILURE = '[MOVIE] Watched Movie unwatch Failure',
    BOOKMARK_WATCHED_MOVIE = '[MOVIE] Watched Movie bookmark',
    UNBOOKMARK_WATCHED_MOVIE = '[MOVIE] Watched Movie unbookmark',
    RATE_WATCHED_MOVIE = '[MOVIE] Watched Movie rate',
    UNRATE_WATCHED_MOVIE = '[MOVIE] Watched Movie unrate',
}


export class FetchWatchedMoviesAction implements Action {
    readonly type = WatchedMoviesActionTypes.FETCH_WATCHED_MOVIES;
    constructor(public payload: any) { }
}

export class FetchWatchedMoviesSuccessAction implements Action {
    readonly type = WatchedMoviesActionTypes.FETCH_WATCHED_MOVIES_SUCCESS;
    constructor(public payload: Page<Movie>) { }
}

export class FetchWatchedMoviesFailureAction implements Action {
    readonly type = WatchedMoviesActionTypes.FETCH_WATCHED_MOVIES_FAILURE;
    constructor(public payload: any) { }
}
export class WatchMovieAction implements Action {
    readonly type = WatchedMoviesActionTypes.WATCH_MOVIE;
    constructor(public payload: any) { }
}
export class WatchMovieSuccessAction implements Action {
    readonly type = WatchedMoviesActionTypes.WATCH_MOVIE_SUCCESS;
    constructor(public payload: Movie) { }
}
export class WatchMovieFailureAction implements Action {
    readonly type = WatchedMoviesActionTypes.WATCH_MOVIE_FAILURE;
    constructor(public payload: any) { }
}
export class UnWatchMovieAction implements Action {
    readonly type = WatchedMoviesActionTypes.UNWATCH_MOVIE;
    constructor(public payload: any) { }
}
export class UnWatchMovieSuccessAction implements Action {
    readonly type = WatchedMoviesActionTypes.UNWATCH_MOVIE_SUCCESS;
    constructor(public payload: Movie) { }
}
export class UnWatchMovieFailureAction implements Action {
    readonly type = WatchedMoviesActionTypes.UNWATCH_MOVIE_FAILURE;
    constructor(public payload: any) { }
}
export class BookmarkWatchedMovieAction implements Action {
    readonly type = WatchedMoviesActionTypes.BOOKMARK_WATCHED_MOVIE;
    constructor(public payload: any) { }
}
export class UnBookmarkWatchedMovieAction implements Action {
    readonly type = WatchedMoviesActionTypes.UNBOOKMARK_WATCHED_MOVIE;
    constructor(public payload: any) { }
}
export class RateWatchedMovieAction implements Action {
    readonly type = WatchedMoviesActionTypes.RATE_WATCHED_MOVIE;
    constructor(public payload: any) { }
}
export class UnRateWatchedMovieAction implements Action {
    readonly type = WatchedMoviesActionTypes.UNRATE_WATCHED_MOVIE;
    constructor(public payload: any) { }
}

export type WatchedMoviesActionUnion
    = FetchWatchedMoviesAction
    | FetchWatchedMoviesSuccessAction
    | FetchWatchedMoviesFailureAction
    | WatchMovieAction
    | WatchMovieSuccessAction
    | WatchMovieFailureAction
    | UnWatchMovieAction
    | UnWatchMovieSuccessAction
    | UnWatchMovieFailureAction
    | BookmarkWatchedMovieAction
    | UnBookmarkWatchedMovieAction
    | RateWatchedMovieAction
    | UnRateWatchedMovieAction
    ;
