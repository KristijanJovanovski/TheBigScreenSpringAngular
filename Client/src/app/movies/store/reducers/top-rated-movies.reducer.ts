import { TopRatedMoviesActionTypes, TopRatedMoviesActionUnion } from '../actions/top-rated-movies.actions';
import { Movie } from '../../models/movie.model';
import { Page } from '../../models/page.model';

export interface Data<T> {
    [id: number]: T;
}
export interface TopRatedMoviesState {
    entities: Data<Movie>;
    fetching: boolean;
    ids: number[];
    currentPageNumber: number;
    totalPages: number;
}

export const initialState: TopRatedMoviesState = {
    entities: {} as Data<Movie>,
    fetching: false,
    ids: [],
    currentPageNumber: -1,
    totalPages: 0
};


export function topRatedMoviesReducer(state: TopRatedMoviesState = initialState, action: TopRatedMoviesActionUnion): TopRatedMoviesState {
    let newIds: number[], page: Page<Movie>, currentPageNumber: number,
        totalPages: number, movies: Movie[], movie: Movie, newMovie: Movie,
        entities: Data<Movie>, newEntities: Data<Movie>;
    switch (action.type) {

        case TopRatedMoviesActionTypes.FETCH_TOP_RATED_MOVIES: {
            return { ...state, fetching: true };
        }

        case TopRatedMoviesActionTypes.FETCH_TOP_RATED_MOVIES_SUCCESS: {
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

        case TopRatedMoviesActionTypes.FETCH_TOP_RATED_MOVIES_FAILURE: {
            return { ...state, fetching: false };
        }

        case TopRatedMoviesActionTypes.BOOKMARK_TOP_RATED_MOVIE: {
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

        case TopRatedMoviesActionTypes.UNBOOKMARK_TOP_RATED_MOVIE: {
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

        case TopRatedMoviesActionTypes.WATCH_TOP_RATED_MOVIE: {
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

        case TopRatedMoviesActionTypes.UNWATCH_TOP_RATED_MOVIE: {
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

        case TopRatedMoviesActionTypes.RATE_TOP_RATED_MOVIE: {
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

        case TopRatedMoviesActionTypes.UNRATE_TOP_RATED_MOVIE: {
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

export const getMovieFromTopRatedMovies = (state: TopRatedMoviesState, id: number) => state.entities[id] || null;
export const getTopRatedMoviesEntities = (state: TopRatedMoviesState) => state.entities;
export const getTopRatedMoviesFetching = (state: TopRatedMoviesState) => state.fetching;

export const getTopRatedMoviesTotalPages = (state: TopRatedMoviesState) => state.totalPages;
export const getTopRatedMoviesCurrentPageNumber = (state: TopRatedMoviesState) => state.currentPageNumber;

export const getTopRatedMoviesFromCurrentPage = (state: TopRatedMoviesState) => {
    const currentPage = state.currentPageNumber;
    const pageSize = 20;
    return state.ids.slice(currentPage * pageSize, (currentPage * pageSize) + pageSize)
        .map(id => state.entities[id]);
};

export const getTopRatedMoviesByPage = (state: TopRatedMoviesState, pageNumber: number) => {
    const totalPages = state.totalPages;
    const pageSize = 20;
    if (pageNumber < totalPages) {
        return state.ids.slice(pageNumber * pageSize, (pageNumber * pageSize) + pageSize).map(
            id => state.entities[id]
        );
    }
    return [];
};

export const getTopRatedMoviesToPage = (state: TopRatedMoviesState, pageNumber: number) => {
    const pageSize = 20;
    return state.ids.slice(0, (pageNumber * pageSize) + pageSize)
        .map(id => state.entities[id]);
};

