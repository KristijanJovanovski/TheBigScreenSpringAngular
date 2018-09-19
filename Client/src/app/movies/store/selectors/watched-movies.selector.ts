import {
    getWatchedMoviesFetching, getWatchedMoviesEntities, getWatchedMoviesTotalPages,
    getWatchedMoviesCurrentPageNumber,
    getWatchedMoviesFromCurrentPage,
    getWatchedMoviesByPage,
    getMovieFromWatchedMovies,
    getWatchedMoviesToPage,
    getWatchedMoviesError,
    getWatchedMoviesPosting
} from '../reducers/watched-movies.reducer';

import { createSelector } from '@ngrx/store';
import { getMoviesState, MoviesState } from '../reducers';

export namespace WatchedMovieSelectors {
    export const selectWatchedMoviesState = createSelector(
        getMoviesState,
        (state: MoviesState) => state.watchedMovies
    );

    export const selectWatchedMovies = createSelector(
        selectWatchedMoviesState,
        getWatchedMoviesEntities
    );

    export const selectWatchedMoviesFetching = createSelector(
        selectWatchedMoviesState,
        getWatchedMoviesFetching
    );

    export const selectWatchedMoviesPosting = createSelector(
        selectWatchedMoviesState,
        getWatchedMoviesPosting
    );

    export const selectWatchedMoviesError = createSelector(
        selectWatchedMoviesState,
        getWatchedMoviesError
    );

    export const selectWatchedMoviesFromCurrentPage = createSelector(
        selectWatchedMoviesState,
        getWatchedMoviesFromCurrentPage
    );

    export const selectWatchedMoviesByPage = (pageNumber: number) => createSelector(
        selectWatchedMoviesState,
        (state) => getWatchedMoviesByPage(state, pageNumber)
    );

    export const selectWatchedMoviesTotalPages = createSelector(
        selectWatchedMoviesState,
        getWatchedMoviesTotalPages
    );


    export const selectMovieFromWatchedMovies = (id: number) => createSelector(
        selectWatchedMoviesState,
        (state) => getMovieFromWatchedMovies(state, id)
    );

    export const selectWatchedMoviesCurrentPageNumber = createSelector(
        selectWatchedMoviesState,
        getWatchedMoviesCurrentPageNumber
    );

    export const selectWatchedMoviesToPage = (pageNumber: number) => createSelector(
        selectWatchedMoviesState,
        (state) => getWatchedMoviesToPage(state, pageNumber)
    );

}
