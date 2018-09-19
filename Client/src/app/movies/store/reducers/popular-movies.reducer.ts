import { PopularMoviesActionTypes, PopularMoviesActionUnion } from '../actions/popular-movies.actions';
import { Movie } from '../../models/movie.model';
import { Page } from '../../models/page.model';

export interface Data<T> {
    [id: number]: T;
}
export interface PopularMoviesState {
    entities: Data<Movie>;
    fetching: boolean;
    ids: number[];
    currentPageNumber: number;
    totalPages: number;
}

export const initialState: PopularMoviesState = {
    entities: {} as Data<Movie>,
    fetching: false,
    ids: [],
    currentPageNumber: -1,
    totalPages: 0
};


export function popularMoviesReducer(state: PopularMoviesState = initialState, action: PopularMoviesActionUnion): PopularMoviesState {
    let newIds: number[], page: Page<Movie>, currentPageNumber: number,
        totalPages: number, movies: Movie[], movie: Movie, newMovie: Movie,
        entities: Data<Movie>, newEntities: Data<Movie>;
    switch (action.type) {

        case PopularMoviesActionTypes.FETCH_POPULAR_MOVIES: {
            return { ...state, fetching: true };
        }

        case PopularMoviesActionTypes.FETCH_POPULAR_MOVIES_SUCCESS: {
            page = action.payload;
            currentPageNumber = page.current;
            totalPages = page.total;
            movies = page.data;
            newEntities = movies.reduce(
                (entities_: { [id: number]: Movie }, movie_: Movie) =>
                    (entities_[movie_.id] = movie_, entities_), { ...state.entities }
            );

            newIds = movies.reduce(
                (ids_: number[], movie_: Movie) =>
                    (ids_.indexOf(movie_.id) === -1 ?
                        ids_.concat(movie_.id) : ids_), [...state.ids]
            );

            return {
                ...state, fetching: false, ids: newIds, currentPageNumber: currentPageNumber,
                totalPages: totalPages, entities: newEntities
            };
        }

        case PopularMoviesActionTypes.FETCH_POPULAR_MOVIES_FAILURE: {
            return { ...state, fetching: false };
        }

        case PopularMoviesActionTypes.BOOKMARK_POPULAR_MOVIE: {
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

        case PopularMoviesActionTypes.UNBOOKMARK_POPULAR_MOVIE: {
            newMovie = action.payload;
            entities = { ...state.entities };
            movie = entities[newMovie.id];
            if (movie) {
                movie = { ...movie, bookmarkedOn: undefined };
                delete entities[action.payload.id];
                newEntities = (entities[movie.id] = movie, entities);
                return { ...state, fetching: false, entities: { ...newEntities } };
            }
            return { ...state, fetching: false };
        }

        case PopularMoviesActionTypes.WATCH_POPULAR_MOVIE: {
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

        case PopularMoviesActionTypes.UNWATCH_POPULAR_MOVIE: {
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

        case PopularMoviesActionTypes.RATE_POPULAR_MOVIE: {
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

        case PopularMoviesActionTypes.UNRATE_POPULAR_MOVIE: {
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

export const getMovieFromPopularMovies = (state: PopularMoviesState, id: number) => state.entities[id] || null;
export const getPopularMoviesEntities = (state: PopularMoviesState) => state.entities;
export const getPopularMoviesFetching = (state: PopularMoviesState) => state.fetching;

export const getPopularMoviesTotalPages = (state: PopularMoviesState) => state.totalPages;
export const getPopularMoviesCurrentPageNumber = (state: PopularMoviesState) => state.currentPageNumber;

export const getPopularMoviesFromCurrentPage = (state: PopularMoviesState) => {
    const currentPage = state.currentPageNumber;
    const pageSize = 20;
    return state.ids.slice(currentPage * pageSize, (currentPage * pageSize) + pageSize)
        .map(id => state.entities[id]);
};

export const getPopularMoviesByPage = (state: PopularMoviesState, pageNumber: number) => {
    const totalPages = state.totalPages;
    const pageSize = 20;
    if (pageNumber < totalPages) {
        return state.ids.slice(pageNumber * pageSize, (pageNumber * pageSize) + pageSize).map(
            id => state.entities[id]
        );
    }
    return [];
};

export const getPopularMoviesToPage = (state: PopularMoviesState, pageNumber: number) => {
    const pageSize = 20;
    return state.ids.slice(0, (pageNumber * pageSize) + pageSize)
        .map(id => state.entities[id]);
};

