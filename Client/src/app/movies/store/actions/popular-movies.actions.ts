import { Action } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import { Page } from '../../models/page.model';

export enum PopularMoviesActionTypes {
    FETCH_POPULAR_MOVIES = '[MOVIE] Popular Movies fetch',
    FETCH_POPULAR_MOVIES_SUCCESS = '[MOVIE] Popular Movies fetch Success',
    FETCH_POPULAR_MOVIES_FAILURE = '[MOVIE] Popular Movies fetch Failure',
    BOOKMARK_POPULAR_MOVIE = '[MOVIE] Popular Movie bookmark',
    UNBOOKMARK_POPULAR_MOVIE = '[MOVIE] Popular Movie unbookmark',
    WATCH_POPULAR_MOVIE = '[MOVIE] Popular Movie watch',
    UNWATCH_POPULAR_MOVIE = '[MOVIE] Popular Movie unwatch',
    RATE_POPULAR_MOVIE = '[MOVIE] Popular Movie rate',
    UNRATE_POPULAR_MOVIE = '[MOVIE] Popular Movie unrate',
}


export class FetchPopularMoviesAction implements Action {
    readonly type = PopularMoviesActionTypes.FETCH_POPULAR_MOVIES;
    constructor(public payload: number) { }
}

export class FetchPopularMoviesSuccessAction implements Action {
    readonly type = PopularMoviesActionTypes.FETCH_POPULAR_MOVIES_SUCCESS;
    constructor(public payload: Page<Movie>) { }
}

export class FetchPopularMoviesFailureAction implements Action {
    readonly type = PopularMoviesActionTypes.FETCH_POPULAR_MOVIES_FAILURE;
    constructor(public payload: any) { }
}
export class BookmarkPopularMovieAction implements Action {
    readonly type = PopularMoviesActionTypes.BOOKMARK_POPULAR_MOVIE;
    constructor(public payload: Movie) { }
}
export class UnBookmarkPopularMovieAction implements Action {
    readonly type = PopularMoviesActionTypes.UNBOOKMARK_POPULAR_MOVIE;
    constructor(public payload: Movie) { }
}
export class WatchPopularMovieAction implements Action {
    readonly type = PopularMoviesActionTypes.WATCH_POPULAR_MOVIE;
    constructor(public payload: Movie) { }
}
export class UnWatchPopularMovieAction implements Action {
    readonly type = PopularMoviesActionTypes.UNWATCH_POPULAR_MOVIE;
    constructor(public payload: Movie) { }
}
export class RatePopularMovieAction implements Action {
    readonly type = PopularMoviesActionTypes.RATE_POPULAR_MOVIE;
    constructor(public payload: Movie) { }
}
export class UnRatePopularMovieAction implements Action {
    readonly type = PopularMoviesActionTypes.UNRATE_POPULAR_MOVIE;
    constructor(public payload: Movie) { }
}

export type PopularMoviesActionUnion
    = FetchPopularMoviesAction
    | FetchPopularMoviesSuccessAction
    | FetchPopularMoviesFailureAction
    | BookmarkPopularMovieAction
    | UnBookmarkPopularMovieAction
    | WatchPopularMovieAction
    | UnWatchPopularMovieAction
    | RatePopularMovieAction
    | UnRatePopularMovieAction
    ;
