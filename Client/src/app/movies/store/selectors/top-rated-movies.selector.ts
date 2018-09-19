import {
    getTopRatedMoviesFetching, getTopRatedMoviesEntities, getTopRatedMoviesTotalPages,
    getTopRatedMoviesCurrentPageNumber,
    getTopRatedMoviesFromCurrentPage,
    getTopRatedMoviesByPage,
    getMovieFromTopRatedMovies,
    getTopRatedMoviesToPage
} from '../reducers/top-rated-movies.reducer';

import { createSelector } from '@ngrx/store';
import { getMoviesState, MoviesState } from '../reducers';

export namespace TopRatedMovieSelectors {
    export const selectTopRatedMoviesState = createSelector(
        getMoviesState,
        (state: MoviesState) => state.topRatedMovies
    );

    export const selectTopRatedMovies = createSelector(
        selectTopRatedMoviesState,
        getTopRatedMoviesEntities
    );

    export const selectTopRatedMoviesFetching = createSelector(
        selectTopRatedMoviesState,
        getTopRatedMoviesFetching
    );

    export const selectTopRatedMoviesFromCurrentPage = createSelector(
        selectTopRatedMoviesState,
        getTopRatedMoviesFromCurrentPage
    );

    export const selectTopRatedMoviesByPage = (pageNumber: number) => createSelector(
        selectTopRatedMoviesState,
        (state) => getTopRatedMoviesByPage(state, pageNumber)
    );

    export const selectTopRatedMoviesTotalPages = createSelector(
        selectTopRatedMoviesState,
        getTopRatedMoviesTotalPages
    );

    export const selectMovieFromTopRatedMovies = (id: number) => createSelector(
        selectTopRatedMoviesState,
        (state) => getMovieFromTopRatedMovies(state, id)
    );

    export const selectTopRatedMoviesCurrentPageNumber = createSelector(
        selectTopRatedMoviesState,
        getTopRatedMoviesCurrentPageNumber
    );

    export const selectTopRatedMoviesToPage = (pageNumber: number) => createSelector(
        selectTopRatedMoviesState,
        (state) => getTopRatedMoviesToPage(state, pageNumber)
    );

}
