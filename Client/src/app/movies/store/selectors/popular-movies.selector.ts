import {
    getPopularMoviesFetching, getPopularMoviesEntities, getPopularMoviesTotalPages,
    getPopularMoviesCurrentPageNumber,
    getPopularMoviesFromCurrentPage,
    getPopularMoviesByPage,
    getMovieFromPopularMovies,
    getPopularMoviesToPage
} from '../reducers/popular-movies.reducer';

import { createSelector } from '@ngrx/store';
import { getMoviesState, MoviesState } from '../reducers';

export namespace PopularMovieSelectors {
    export const selectPopularMoviesState = createSelector(
        getMoviesState,
        (state: MoviesState) => state.popularMovies
    );

    export const selectPopularMovies = createSelector(
        selectPopularMoviesState,
        getPopularMoviesEntities
    );

    export const selectPopularMoviesFetching = createSelector(
        selectPopularMoviesState,
        getPopularMoviesFetching
    );

    export const selectPopularMoviesFromCurrentPage = createSelector(
        selectPopularMoviesState,
        getPopularMoviesFromCurrentPage
    );

    export const selectPopularMoviesByPage = (pageNumber: number) => createSelector(
        selectPopularMoviesState,
        (state) => getPopularMoviesByPage(state, pageNumber)
    );

    export const selectPopularMoviesTotalPages = createSelector(
        selectPopularMoviesState,
        getPopularMoviesTotalPages
    );

    export const selectMovieFromPopularMovies = (id: number) => createSelector(
        selectPopularMoviesState,
        (state) => getMovieFromPopularMovies(state, id)
    );

    export const selectPopularMoviesCurrentPageNumber = createSelector(
        selectPopularMoviesState,
        getPopularMoviesCurrentPageNumber
    );

    export const selectPopularMoviesToPage = (pageNumber: number) => createSelector(
        selectPopularMoviesState,
        (state) => getPopularMoviesToPage(state, pageNumber)
    );

}
