import { Action } from '@ngrx/store';
import { Movie } from '../../models/movie.model';

export enum MovieDetailsActionTypes {
    FETCH_MOVIE_DETAILS = '[MOVIE] Movie Details fetch',
    FETCH_MOVIE_DETAILS_SUCCESS = '[MOVIE] Movie Details fetch Success',
    FETCH_MOVIE_DETAILS_FAILURE = '[MOVIE] Movie Details fetch Failure',
    CLEAR_MOVIE_DETAILS = '[MOVIE] Movie Details clear',
}


export class FetchMovieDetailsAction implements Action {
    readonly type = MovieDetailsActionTypes.FETCH_MOVIE_DETAILS;
    constructor(public payload: number) { }
}

export class FetchMovieDetailsSuccessAction implements Action {
    readonly type = MovieDetailsActionTypes.FETCH_MOVIE_DETAILS_SUCCESS;
    constructor(public payload: Movie) { }
}

export class FetchMovieDetailsFailureAction implements Action {
    readonly type = MovieDetailsActionTypes.FETCH_MOVIE_DETAILS_FAILURE;
    constructor(public payload: any) { }
}

export class ClearMovieDetailsAction implements Action {
    readonly type = MovieDetailsActionTypes.CLEAR_MOVIE_DETAILS;
}

export type MovieDetailsActionUnion
    = FetchMovieDetailsAction
    | FetchMovieDetailsSuccessAction
    | FetchMovieDetailsFailureAction
    | ClearMovieDetailsAction
    ;
