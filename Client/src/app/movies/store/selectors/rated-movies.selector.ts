import {
    getRatedMoviesFetching, getRatedMoviesEntities, getRatedMoviesTotalPages,
    getRatedMoviesCurrentPageNumber,
    getRatedMoviesFromCurrentPage,
    getRatedMoviesByPage,
    getMovieFromRatedMovies,
    getRatedMoviesToPage,
    getRatedMoviesError,
    getRatedMoviesPosting
} from '../reducers/rated-movies.reducer';

import { createSelector } from '@ngrx/store';
import { getMoviesState, MoviesState } from '../reducers';

export namespace RatedMovieSelectors {
    export const selectRatedMoviesState = createSelector(
        getMoviesState,
        (state: MoviesState) => state.ratedMovies
    );

    export const selectRatedMovies = createSelector(
        selectRatedMoviesState,
        getRatedMoviesEntities
    );

    export const selectRatedMoviesFetching = createSelector(
        selectRatedMoviesState,
        getRatedMoviesFetching
    );

    export const selectRatedMoviesPosting = createSelector(
        selectRatedMoviesState,
        getRatedMoviesPosting
    );

    export const selectRatedMoviesError = createSelector(
        selectRatedMoviesState,
        getRatedMoviesError
    );

    export const selectRatedMoviesFromCurrentPage = createSelector(
        selectRatedMoviesState,
        getRatedMoviesFromCurrentPage
    );

    export const selectRatedMoviesByPage = (pageNumber: number) => createSelector(
        selectRatedMoviesState,
        (state) => getRatedMoviesByPage(state, pageNumber)
    );

    export const selectRatedMoviesTotalPages = createSelector(
        selectRatedMoviesState,
        getRatedMoviesTotalPages
    );


    export const selectMovieFromRatedMovies = (id: number) => createSelector(
        selectRatedMoviesState,
        (state) => getMovieFromRatedMovies(state, id)
    );

    export const selectRatedMoviesCurrentPageNumber = createSelector(
        selectRatedMoviesState,
        getRatedMoviesCurrentPageNumber
    );

    export const selectRatedMoviesToPage = (pageNumber: number) => createSelector(
        selectRatedMoviesState,
        (state) => getRatedMoviesToPage(state, pageNumber)
    );

}
