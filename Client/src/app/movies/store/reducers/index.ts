import * as fromPopularMoviesReducer from './popular-movies.reducer';
import * as fromTopRatedMoviesReducer from './top-rated-movies.reducer';
import * as fromBookmarkedMoviesReducer from './bookmarked-movies.reducer';
import * as fromWatchedMoviesReducer from './watched-movies.reducer';
import * as fromRatedMoviesReducer from './rated-movies.reducer';
import * as fromMovieDetailsReducer from './movie-details.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface MoviesState {
    popularMovies: fromPopularMoviesReducer.PopularMoviesState;
    topRatedMovies: fromTopRatedMoviesReducer.TopRatedMoviesState;
    bookmarkedMovies: fromBookmarkedMoviesReducer.BookmarkedMoviesState;
    watchedMovies: fromWatchedMoviesReducer.WatchedMoviesState;
    ratedMovies: fromRatedMoviesReducer.RatedMoviesState;
    movieDetails: fromMovieDetailsReducer.MovieDetailsState;
}

export const reducers: ActionReducerMap<MoviesState> = {
    popularMovies: fromPopularMoviesReducer.popularMoviesReducer,
    topRatedMovies: fromTopRatedMoviesReducer.topRatedMoviesReducer,
    bookmarkedMovies: fromBookmarkedMoviesReducer.bookmarkedMoviesReducer,
    watchedMovies: fromWatchedMoviesReducer.watchedMoviesReducer,
    ratedMovies: fromRatedMoviesReducer.ratedMoviesReducer,
    movieDetails: fromMovieDetailsReducer.movieDetailsReducer
};

export const getMoviesState = createFeatureSelector(
    'movies'
);
