import { RatedMoviesActionTypes, RatedMoviesActionUnion } from '../actions/rated-movies.actions';
import { Movie } from '../../models/movie.model';
import { Page } from '../../models/page.model';

export interface Data<T> {
    [id: number]: T;
}

export interface RatedMoviesState {
    entities: Data<Movie>;
    fetching: boolean;
    posting: boolean;
    error?: string;
    ids: number[];
    currentPageNumber: number;
    totalPages: number;
}

export const initialState: RatedMoviesState = {
    entities: {} as Data<Movie>,
    fetching: false,
    posting: false,
    error: undefined,
    ids: [],
    currentPageNumber: -1,
    totalPages: 0
};


export function ratedMoviesReducer(state: RatedMoviesState = initialState, action: RatedMoviesActionUnion)
    : RatedMoviesState {
    let newIds: number[], page: Page<Movie>, currentPageNumber: number,
        totalPages: number, movies: Movie[], movie: Movie, newMovie: Movie,
        entities: Data<Movie>, newEntities: Data<Movie>;
    switch (action.type) {
        case RatedMoviesActionTypes.FETCH_RATED_MOVIES: {
            return { ...state, fetching: true };
        }

        case RatedMoviesActionTypes.FETCH_RATED_MOVIES_SUCCESS: {
            page = action.payload;
            currentPageNumber = page.current;
            totalPages = page.total;
            movies = page.data as Movie[];
            newEntities = movies.reduce(
                (entities_: { [id: number]: Movie }, movie_: Movie) =>
                    (entities_[movie_.id] = movie_, entities_), { ...state.entities }
            ) as Data<Movie>;

            newIds = movies.reduce(
                (ids_: number[], movie_: Movie) =>
                    (ids_.indexOf(movie_.id) === -1 ?
                        ids_.concat(movie_.id) : ids_), [...state.ids]
            );


            return {
                ...state, fetching: false,
                ids: newIds, currentPageNumber: currentPageNumber,
                totalPages: totalPages,
                entities: newEntities
            };
        }

        // TODO: set error here for snackbar
        case RatedMoviesActionTypes.FETCH_RATED_MOVIES_FAILURE: {
            return { ...state, fetching: false };
        }

        case RatedMoviesActionTypes.RATE_MOVIE: {
            return { ...state, posting: true };
        }

        case RatedMoviesActionTypes.UNRATE_MOVIE: {
            return { ...state, posting: true };
        }

        case RatedMoviesActionTypes.RATE_MOVIE_SUCCESS: {
            movie = action.payload as Movie;
            entities = { ...state.entities } as Data<Movie>;
            newEntities = (entities[movie.id] = movie, entities);
            return {
                ...state, posting: false,
                entities: { ...newEntities },
                ids: [movie.id, ...state.ids]
            };
        }

        case RatedMoviesActionTypes.UNRATE_MOVIE_SUCCESS: {
            movie = action.payload as Movie;
            entities = { ...state.entities } as Data<Movie>;
            delete entities[movie.id];
            newIds = state.ids.filter(id => id !== movie.id);
            return {
                ...state, posting: false,
                entities: { ...entities },
                ids: [...newIds]
            };
        }

        case RatedMoviesActionTypes.RATE_MOVIE_FAILURE: {
            return { ...state, posting: false, error: action.payload.error };
        }

        case RatedMoviesActionTypes.UNRATE_MOVIE_FAILURE: {
            return { ...state, posting: false, error: action.payload.error };
        }

        case RatedMoviesActionTypes.BOOKMARK_RATED_MOVIE: {
            newMovie = action.payload;
            movie = state.entities[newMovie.id];
            if (movie) {
                movie = { ...movie, bookmarkedOn: newMovie.bookmarkedOn };
                entities = { ...state.entities };
                newEntities = (entities[movie.id] = movie, entities);
                return {
                    ...state, fetching: false,
                    entities: { ...state.entities, ...newEntities }
                };
            }
            return { ...state, fetching: false };
        }

        case RatedMoviesActionTypes.UNBOOKMARK_RATED_MOVIE: {
            newMovie = action.payload;
            entities = { ...state.entities };
            movie = entities[newMovie.id];
            if (movie) {
                movie = { ...movie, bookmarkedOn: undefined };
                delete entities[newMovie.id];
                newEntities = (entities[movie.id] = movie, entities);
                return { ...state, fetching: false, entities: { ...newEntities } };
            }
            return { ...state, fetching: false };
        }

        case RatedMoviesActionTypes.WATCH_RATED_MOVIE: {
            newMovie = action.payload;
            movie = state.entities[newMovie.id];
            if (movie) {
                movie = { ...movie, watchedOn: newMovie.watchedOn };
                entities = { ...state.entities };
                newEntities = (entities[movie.id] = movie, entities);
                return {
                    ...state, fetching: false,
                    entities: { ...state.entities, ...newEntities }
                };
            }
            return { ...state, fetching: false };
        }

        case RatedMoviesActionTypes.UNWATCH_RATED_MOVIE: {
            newMovie = action.payload;
            entities = { ...state.entities };
            movie = entities[newMovie.id];
            if (movie) {
                movie = { ...movie, watchedOn: undefined };
                delete entities[action.payload.id];
                newEntities = (entities[movie.id] = movie, entities);
                return { ...state, fetching: false, entities: { ...newEntities } };
            }
            return { ...state, fetching: false };
        }

        default:
            return state;
    }
}

export const getMovieFromRatedMovies = (state: RatedMoviesState, id: number) => state.entities[id] || null;
export const getRatedMoviesEntities = (state: RatedMoviesState) => state.entities;
export const getRatedMoviesFetching = (state: RatedMoviesState) => state.fetching;
export const getRatedMoviesPosting = (state: RatedMoviesState) => state.posting;
export const getRatedMoviesError = (state: RatedMoviesState) => state.error;

export const getRatedMoviesTotalPages = (state: RatedMoviesState) => state.totalPages;
export const getRatedMoviesCurrentPageNumber = (state: RatedMoviesState) => state.currentPageNumber;

export const getRatedMoviesFromCurrentPage = (state: RatedMoviesState) => {
    const currentPage = state.currentPageNumber;
    const pageSize = 20;
    return state.ids.slice(currentPage * pageSize, (currentPage * pageSize) + pageSize)
        .map(id => state.entities[id]);
};
export const getRatedMoviesByPage = (state: RatedMoviesState, pageNumber: number) => {
    const totalPages = state.totalPages;
    const pageSize = 20;
    if (pageNumber < totalPages) {
        return state.ids.slice(pageNumber * pageSize, (pageNumber * pageSize) + pageSize).map(
            id => state.entities[id]
        );
    }
    return [];
};

export const getRatedMoviesToPage = (state: RatedMoviesState, pageNumber: number) => {
    const pageSize = 20;
    return state.ids.slice(0, (pageNumber * pageSize) + pageSize)
        .map(id => state.entities[id]);
};

