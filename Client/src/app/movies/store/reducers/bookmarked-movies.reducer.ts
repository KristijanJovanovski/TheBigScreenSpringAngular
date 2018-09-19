import { BookmarkedMoviesActionTypes, BookmarkedMoviesActionUnion } from '../actions/bookmarked-movies.actions';
import { Movie } from '../../models/movie.model';
import { Page } from '../../models/page.model';

export interface Data<T> {
    [id: number]: T;
}

export interface BookmarkedMoviesState {
    entities: Data<Movie>;
    fetching: boolean;
    posting: boolean;
    error?: string;
    ids: number[];
    currentPageNumber: number;
    totalPages: number;
}

export const initialState: BookmarkedMoviesState = {
    entities: {} as Data<Movie>,
    fetching: false,
    posting: false,
    error: undefined,
    ids: [],
    currentPageNumber: -1,
    totalPages: 0
};


export function bookmarkedMoviesReducer(state: BookmarkedMoviesState = initialState, action: BookmarkedMoviesActionUnion)
    : BookmarkedMoviesState {
    let newIds: number[], page: Page<Movie>, currentPageNumber: number,
        totalPages: number, movies: Movie[], movie: Movie, newMovie: Movie,
        entities: Data<Movie>, newEntities: Data<Movie>;
    switch (action.type) {
        case BookmarkedMoviesActionTypes.FETCH_BOOKMARKED_MOVIES: {
            return { ...state, fetching: true };
        }

        case BookmarkedMoviesActionTypes.FETCH_BOOKMARKED_MOVIES_SUCCESS: {
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
        case BookmarkedMoviesActionTypes.FETCH_BOOKMARKED_MOVIES_FAILURE: {
            return { ...state, fetching: false };
        }

        case BookmarkedMoviesActionTypes.BOOKMARK_MOVIE: {
            return { ...state, posting: true };
        }

        case BookmarkedMoviesActionTypes.UNBOOKMARK_MOVIE: {
            return { ...state, posting: true };
        }

        case BookmarkedMoviesActionTypes.BOOKMARK_MOVIE_SUCCESS: {
            movie = action.payload as Movie;
            entities = { ...state.entities } as Data<Movie>;
            newEntities = (entities[movie.id] = movie, entities);
            return {
                ...state, posting: false,
                entities: { ...newEntities },
                ids: [movie.id, ...state.ids]
            };
        }

        case BookmarkedMoviesActionTypes.UNBOOKMARK_MOVIE_SUCCESS: {
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

        case BookmarkedMoviesActionTypes.BOOKMARK_MOVIE_FAILURE: {
            return { ...state, posting: false, error: action.payload.error };
        }

        case BookmarkedMoviesActionTypes.UNBOOKMARK_MOVIE_FAILURE: {
            return { ...state, posting: false, error: action.payload.error };
        }

        case BookmarkedMoviesActionTypes.WATCH_BOOKMARKED_MOVIE: {
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

        case BookmarkedMoviesActionTypes.UNWATCH_BOOKMARKED_MOVIE: {
            newMovie = action.payload;
            entities = { ...state.entities };
            movie = entities[newMovie.id];
            if (movie) {
                movie = { ...movie, watchedOn: undefined };
                delete entities[newMovie.id];
                newEntities = (entities[movie.id] = movie, entities);
                return { ...state, fetching: false, entities: { ...newEntities } };
            }
            return { ...state, fetching: false };
        }

        case BookmarkedMoviesActionTypes.RATE_BOOKMARKED_MOVIE: {
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

        case BookmarkedMoviesActionTypes.UNRATE_BOOKMARKED_MOVIE: {
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

export const getMovieFromBookmarkedMovies = (state: BookmarkedMoviesState, id: number) => state.entities[id] || null;
export const getBookmarkedMoviesEntities = (state: BookmarkedMoviesState) => state.entities;
export const getBookmarkedMoviesFetching = (state: BookmarkedMoviesState) => state.fetching;
export const getBookmarkedMoviesPosting = (state: BookmarkedMoviesState) => state.posting;
export const getBookmarkedMoviesError = (state: BookmarkedMoviesState) => state.error;

export const getBookmarkedMoviesTotalPages = (state: BookmarkedMoviesState) => state.totalPages;
export const getBookmarkedMoviesCurrentPageNumber = (state: BookmarkedMoviesState) => state.currentPageNumber;

export const getBookmarkedMoviesFromCurrentPage = (state: BookmarkedMoviesState) => {
    const currentPage = state.currentPageNumber;
    const pageSize = 20;
    return state.ids.slice(currentPage * pageSize, (currentPage * pageSize) + pageSize)
        .map(id => state.entities[id]);
};
export const getBookmarkedMoviesByPage = (state: BookmarkedMoviesState, pageNumber: number) => {
    const totalPages = state.totalPages;
    const pageSize = 20;
    if (pageNumber < totalPages) {
        return state.ids.slice(pageNumber * pageSize, (pageNumber * pageSize) + pageSize).map(
            id => state.entities[id]
        );
    }
    return [];
};

export const getBookmarkedMoviesToPage = (state: BookmarkedMoviesState, pageNumber: number) => {
    const pageSize = 20;
    return state.ids.slice(0, (pageNumber * pageSize) + pageSize)
        .map(id => state.entities[id]);
};

