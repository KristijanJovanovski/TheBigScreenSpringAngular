import { Action } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import { Page } from '../../models/page.model';

export enum BookmarkedMoviesActionTypes {
    FETCH_BOOKMARKED_MOVIES = '[MOVIE] Bookmarked Movies fetch',
    FETCH_BOOKMARKED_MOVIES_SUCCESS = '[MOVIE] Bookmarked Movies fetch Success',
    FETCH_BOOKMARKED_MOVIES_FAILURE = '[MOVIE] Bookmarked Movies fetch Failure',
    BOOKMARK_MOVIE = '[MOVIE] Bookmarked Movie bookmark',
    BOOKMARK_MOVIE_SUCCESS = '[MOVIE] Bookmarked Movie bookmark Success',
    BOOKMARK_MOVIE_FAILURE = '[MOVIE] Bookmarked Movie bookmark Failure',
    UNBOOKMARK_MOVIE = '[MOVIE] Bookmarked Movie unbookmark',
    UNBOOKMARK_MOVIE_SUCCESS = '[MOVIE] Bookmarked Movie unbookmark Success',
    UNBOOKMARK_MOVIE_FAILURE = '[MOVIE] Bookmarked Movie unbookmark Failure',
    WATCH_BOOKMARKED_MOVIE = '[MOVIE] Bookmarked Movie watch',
    UNWATCH_BOOKMARKED_MOVIE = '[MOVIE] Bookmarked Movie unwatch',
    RATE_BOOKMARKED_MOVIE = '[MOVIE] Bookmarked Movie rate',
    UNRATE_BOOKMARKED_MOVIE = '[MOVIE] Bookmarked Movie unrate',
}


export class FetchBookmarkedMoviesAction implements Action {
    readonly type = BookmarkedMoviesActionTypes.FETCH_BOOKMARKED_MOVIES;
    constructor(public payload: any) { }
}

export class FetchBookmarkedMoviesSuccessAction implements Action {
    readonly type = BookmarkedMoviesActionTypes.FETCH_BOOKMARKED_MOVIES_SUCCESS;
    constructor(public payload: Page<Movie>) { }
}

export class FetchBookmarkedMoviesFailureAction implements Action {
    readonly type = BookmarkedMoviesActionTypes.FETCH_BOOKMARKED_MOVIES_FAILURE;
    constructor(public payload: any) { }
}
export class BookmarkMovieAction implements Action {
    readonly type = BookmarkedMoviesActionTypes.BOOKMARK_MOVIE;
    constructor(public payload: any) { }
}
export class BookmarkMovieSuccessAction implements Action {
    readonly type = BookmarkedMoviesActionTypes.BOOKMARK_MOVIE_SUCCESS;
    constructor(public payload: Movie) { }
}
export class BookmarkMovieFailureAction implements Action {
    readonly type = BookmarkedMoviesActionTypes.BOOKMARK_MOVIE_FAILURE;
    constructor(public payload: any) { }
}
export class UnBookmarkMovieAction implements Action {
    readonly type = BookmarkedMoviesActionTypes.UNBOOKMARK_MOVIE;
    constructor(public payload: any) { }
}
export class UnBookmarkMovieSuccessAction implements Action {
    readonly type = BookmarkedMoviesActionTypes.UNBOOKMARK_MOVIE_SUCCESS;
    constructor(public payload: Movie) { }
}
export class UnBookmarkMovieFailureAction implements Action {
    readonly type = BookmarkedMoviesActionTypes.UNBOOKMARK_MOVIE_FAILURE;
    constructor(public payload: any) { }
}
export class WatchBookmarkedMovieAction implements Action {
    readonly type = BookmarkedMoviesActionTypes.WATCH_BOOKMARKED_MOVIE;
    constructor(public payload: Movie) { }
}
export class UnWatchBookmarkedMovieAction implements Action {
    readonly type = BookmarkedMoviesActionTypes.UNWATCH_BOOKMARKED_MOVIE;
    constructor(public payload: Movie) { }
}
export class RateBookmarkedMovieAction implements Action {
    readonly type = BookmarkedMoviesActionTypes.RATE_BOOKMARKED_MOVIE;
    constructor(public payload: Movie) { }
}
export class UnRateBookmarkedMovieAction implements Action {
    readonly type = BookmarkedMoviesActionTypes.UNRATE_BOOKMARKED_MOVIE;
    constructor(public payload: Movie) { }
}

export type BookmarkedMoviesActionUnion
    = FetchBookmarkedMoviesAction
    | FetchBookmarkedMoviesSuccessAction
    | FetchBookmarkedMoviesFailureAction
    | BookmarkMovieAction
    | BookmarkMovieSuccessAction
    | BookmarkMovieFailureAction
    | UnBookmarkMovieAction
    | UnBookmarkMovieSuccessAction
    | UnBookmarkMovieFailureAction
    | WatchBookmarkedMovieAction
    | UnWatchBookmarkedMovieAction
    | RateBookmarkedMovieAction
    | UnRateBookmarkedMovieAction
    ;
