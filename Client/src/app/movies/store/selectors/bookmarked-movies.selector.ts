import {
    getBookmarkedMoviesFetching, getBookmarkedMoviesEntities, getBookmarkedMoviesTotalPages,
    getBookmarkedMoviesCurrentPageNumber,
    getBookmarkedMoviesFromCurrentPage,
    getBookmarkedMoviesByPage,
    getMovieFromBookmarkedMovies,
    getBookmarkedMoviesToPage,
    getBookmarkedMoviesError,
    getBookmarkedMoviesPosting
} from '../reducers/bookmarked-movies.reducer';

import { createSelector } from '@ngrx/store';
import { getMoviesState, MoviesState } from '../reducers';

export namespace BookmarkedMovieSelectors {
    export const selectBookmarkedMoviesState = createSelector(
        getMoviesState,
        (state: MoviesState) => state.bookmarkedMovies
    );

    export const selectBookmarkedMovies = createSelector(
        selectBookmarkedMoviesState,
        getBookmarkedMoviesEntities
    );

    export const selectBookmarkedMoviesFetching = createSelector(
        selectBookmarkedMoviesState,
        getBookmarkedMoviesFetching
    );

    export const selectBookmarkedMoviesPosting = createSelector(
        selectBookmarkedMoviesState,
        getBookmarkedMoviesPosting
    );

    export const selectBookmarkedMoviesError = createSelector(
        selectBookmarkedMoviesState,
        getBookmarkedMoviesError
    );

    export const selectBookmarkedMoviesFromCurrentPage = createSelector(
        selectBookmarkedMoviesState,
        getBookmarkedMoviesFromCurrentPage
    );

    export const selectBookmarkedMoviesByPage = (pageNumber: number) => createSelector(
        selectBookmarkedMoviesState,
        (state) => getBookmarkedMoviesByPage(state, pageNumber)
    );

    export const selectBookmarkedMoviesTotalPages = createSelector(
        selectBookmarkedMoviesState,
        getBookmarkedMoviesTotalPages
    );


    export const selectMovieFromBookmarkedMovies = (id: number) => createSelector(
        selectBookmarkedMoviesState,
        (state) => getMovieFromBookmarkedMovies(state, id)
    );

    export const selectBookmarkedMoviesCurrentPageNumber = createSelector(
        selectBookmarkedMoviesState,
        getBookmarkedMoviesCurrentPageNumber
    );

    export const selectBookmarkedMoviesToPage = (pageNumber: number) => createSelector(
        selectBookmarkedMoviesState,
        (state) => getBookmarkedMoviesToPage(state, pageNumber)
    );

}
