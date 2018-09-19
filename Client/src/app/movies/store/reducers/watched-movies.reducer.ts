import { WatchedMoviesActionTypes, WatchedMoviesActionUnion } from '../actions/watched-movies.actions';
import { Movie } from '../../models/movie.model';
import { Page } from '../../models/page.model';

export interface Data<T> {
    [id: number]: T;
}

export interface WatchedMoviesState {
    entities: Data<Movie>;
    fetching: boolean;
    posting: boolean;
    error?: string;
    ids: number[];
    currentPageNumber: number;
    totalPages: number;
}

export const initialState: WatchedMoviesState = {
    entities: {} as Data<Movie>,
    fetching: false,
    posting: false,
    error: undefined,
    ids: [],
    currentPageNumber: -1,
    totalPages: 0
};


export function watchedMoviesReducer(state: WatchedMoviesState = initialState, action: WatchedMoviesActionUnion)
    : WatchedMoviesState {
    let newIds: number[], page: Page<Movie>, currentPageNumber: number,
        totalPages: number, movies: Movie[], movie: Movie, newMovie: Movie,
        entities: Data<Movie>, newEntities: Data<Movie>;
    switch (action.type) {
        case WatchedMoviesActionTypes.FETCH_WATCHED_MOVIES: {
            return { ...state, fetching: true };
        }

        case WatchedMoviesActionTypes.FETCH_WATCHED_MOVIES_SUCCESS: {
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
        case WatchedMoviesActionTypes.FETCH_WATCHED_MOVIES_FAILURE: {
            return { ...state, fetching: false };
        }

        case WatchedMoviesActionTypes.WATCH_MOVIE: {
            return { ...state, posting: true };
        }

        case WatchedMoviesActionTypes.UNWATCH_MOVIE: {
            return { ...state, posting: true };
        }

        case WatchedMoviesActionTypes.WATCH_MOVIE_SUCCESS: {
            movie = action.payload as Movie;
            entities = { ...state.entities } as Data<Movie>;
            newEntities = (entities[movie.id] = movie, entities);
            return {
                ...state, posting: false,
                entities: { ...newEntities },
                ids: [movie.id, ...state.ids]
            };
        }

        case WatchedMoviesActionTypes.UNWATCH_MOVIE_SUCCESS: {
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

        case WatchedMoviesActionTypes.WATCH_MOVIE_FAILURE: {
            return { ...state, posting: false, error: action.payload.error };
        }

        case WatchedMoviesActionTypes.UNWATCH_MOVIE_FAILURE: {
            return { ...state, posting: false, error: action.payload.error };
        }

        case WatchedMoviesActionTypes.BOOKMARK_WATCHED_MOVIE: {
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

        case WatchedMoviesActionTypes.UNBOOKMARK_WATCHED_MOVIE: {
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

        case WatchedMoviesActionTypes.RATE_WATCHED_MOVIE: {
            newMovie = action.payload;
            movie = state.entities[newMovie.id];
            if (movie) {
                movie = { ...movie, ratedOn: newMovie.ratedOn, rate: newMovie.rate };
                entities = { ...state.entities };
                newEntities = (entities[movie.id] = movie, entities);
                return {
                    ...state, fetching: false,
                    entities: { ...state.entities, ...newEntities }
                };
            }
            return { ...state, fetching: false };
        }

        case WatchedMoviesActionTypes.UNRATE_WATCHED_MOVIE: {
            newMovie = action.payload;
            entities = { ...state.entities };
            movie = entities[newMovie.id];
            if (movie) {
                movie = { ...movie, ratedOn: undefined, rate: undefined };
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

export const getMovieFromWatchedMovies = (state: WatchedMoviesState, id: number) => state.entities[id] || null;
export const getWatchedMoviesEntities = (state: WatchedMoviesState) => state.entities;
export const getWatchedMoviesFetching = (state: WatchedMoviesState) => state.fetching;
export const getWatchedMoviesPosting = (state: WatchedMoviesState) => state.posting;
export const getWatchedMoviesError = (state: WatchedMoviesState) => state.error;

export const getWatchedMoviesTotalPages = (state: WatchedMoviesState) => state.totalPages;
export const getWatchedMoviesCurrentPageNumber = (state: WatchedMoviesState) => state.currentPageNumber;

export const getWatchedMoviesFromCurrentPage = (state: WatchedMoviesState) => {
    const currentPage = state.currentPageNumber;
    const pageSize = 20;
    return state.ids.slice(currentPage * pageSize, (currentPage * pageSize) + pageSize)
        .map(id => state.entities[id]);
};
export const getWatchedMoviesByPage = (state: WatchedMoviesState, pageNumber: number) => {
    const totalPages = state.totalPages;
    const pageSize = 20;
    if (pageNumber < totalPages) {
        return state.ids.slice(pageNumber * pageSize, (pageNumber * pageSize) + pageSize).map(
            id => state.entities[id]
        );
    }
    return [];
};

export const getWatchedMoviesToPage = (state: WatchedMoviesState, pageNumber: number) => {
    const pageSize = 20;
    return state.ids.slice(0, (pageNumber * pageSize) + pageSize)
        .map(id => state.entities[id]);
};

