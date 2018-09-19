import { Movie } from '../../models/movie.model';
import { MovieDetailsActionUnion, MovieDetailsActionTypes } from '../actions/movie-details.actions';

export interface MovieDetailsState {
    fetching: boolean;
    error?: string;
    entity?: Movie;
}
export const initialState: MovieDetailsState = {
    fetching: false,
    error: undefined,
    entity: undefined
};

export function movieDetailsReducer(state: MovieDetailsState, action: MovieDetailsActionUnion)
    : MovieDetailsState {

    switch (action.type) {
        case MovieDetailsActionTypes.FETCH_MOVIE_DETAILS: {
            return { ...state, fetching: true };
        }
        case MovieDetailsActionTypes.FETCH_MOVIE_DETAILS_SUCCESS: {
            const movie = action.payload;
            return {
                ...state, fetching: false,
                entity: movie
            };
        }
        case MovieDetailsActionTypes.FETCH_MOVIE_DETAILS_FAILURE: {
            return { ...state, error: action.payload.error, fetching: false };
        }
        case MovieDetailsActionTypes.CLEAR_MOVIE_DETAILS: {
            return { ...state, error: undefined, fetching: false, entity: undefined };
        }
        default: {
            return state;
        }
    }
}


export const getMovieDetailsEntity = (state: MovieDetailsState) => state.entity;
export const getMovieDetailsFetching = (state: MovieDetailsState) => state.fetching;
export const getMovieDetailsError = (state: MovieDetailsState) => state.error;
