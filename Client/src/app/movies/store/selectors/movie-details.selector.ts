import { getMoviesState, MoviesState } from '../reducers';
import { createSelector } from '@ngrx/store';
import { getMovieDetailsEntity, getMovieDetailsError, getMovieDetailsFetching } from '../reducers/movie-details.reducer';

export namespace MovieDetailsSelectors {
    export const selectMovieDetailsState = createSelector(
        getMoviesState,
        (state: MoviesState) => state.movieDetails
    );
    export const selectMovieDetails = createSelector(
        selectMovieDetailsState,
        getMovieDetailsEntity
    );

    export const selectMovieDetailsError = createSelector(
        selectMovieDetailsState,
        getMovieDetailsError
    );

    export const selectMovieDetailsFetching = createSelector(
        selectMovieDetailsState,
        getMovieDetailsFetching
    );

}
