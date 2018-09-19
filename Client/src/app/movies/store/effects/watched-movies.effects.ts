import {
    WatchPopularMovieAction, UnWatchPopularMovieAction,
    UnWatchTopRatedMovieAction, UnWatchBookmarkedMovieAction,
    UnWatchRatedMovieAction, WatchTopRatedMovieAction,
    WatchBookmarkedMovieAction, WatchRatedMovieAction,
    WatchedMoviesActionTypes, FetchWatchedMoviesSuccessAction,
    FetchWatchedMoviesFailureAction, WatchMovieAction,
    WatchMovieSuccessAction, WatchMovieFailureAction,
    UnWatchMovieAction, UnWatchMovieFailureAction,
    UnWatchMovieSuccessAction,
    FetchWatchedMoviesAction
} from '../actions';

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MoviesService } from '../../services';
import { Page } from '../../models/page.model';
import { Movie } from '../../models/movie.model';


@Injectable()
export class WatchedMovieEffects {

    constructor(private actions$: Actions, private movieService: MoviesService) { }


    @Effect()
    fetchWatchedMovies$ = this.actions$.ofType(WatchedMoviesActionTypes.FETCH_WATCHED_MOVIES)
        .pipe(
            map((action: FetchWatchedMoviesAction) => action.payload),
            switchMap((payload) => this.movieService.fetchWatchedMovies(payload.user, payload.page).pipe(
                map((page: Page<Movie>) => new FetchWatchedMoviesSuccessAction(page)),
                catchError(err => of(new FetchWatchedMoviesFailureAction(err)))
            )
            ));

    @Effect({ dispatch: false })
    fetchWatchedMoviesSuccess$ = this.actions$
        .ofType(WatchedMoviesActionTypes.FETCH_WATCHED_MOVIES_SUCCESS);

    @Effect({ dispatch: false })
    fetchWatchedMoviesFailure$ = this.actions$
        .ofType(WatchedMoviesActionTypes.FETCH_WATCHED_MOVIES_FAILURE);

    @Effect()
    postWatchedMovie$ = this.actions$.ofType(WatchedMoviesActionTypes.WATCH_MOVIE)
        .pipe(
            map((action: WatchMovieAction) => action.payload),
            switchMap((payload) => this.movieService.watchMovie(payload.movie, payload.user)),
            map((movie: Movie) => new WatchMovieSuccessAction(movie)),
            catchError(err => of(new WatchMovieFailureAction(err)))
        );

    @Effect()
    postWatchedMovieSuccess$ = this.actions$.ofType(WatchedMoviesActionTypes.WATCH_MOVIE_SUCCESS)
        .pipe(
            map((action: WatchMovieSuccessAction) => action.payload),
            switchMap((payload: Movie) => of(
                new WatchPopularMovieAction(payload),
                new WatchTopRatedMovieAction(payload),
                new WatchBookmarkedMovieAction(payload),
                new WatchRatedMovieAction(payload)
            ))
        );

    @Effect({ dispatch: false })
    postWatchedMovieFailure$ = this.actions$
        .ofType(WatchedMoviesActionTypes.WATCH_MOVIE_FAILURE);

    @Effect()
    postUnWatchedMovie$ = this.actions$.ofType(WatchedMoviesActionTypes.UNWATCH_MOVIE)
        .pipe(
            map((action: UnWatchMovieAction) => action.payload),
            switchMap((payload) => this.movieService.unWatchMovie(payload.movie, payload.user)),
            map((movie: Movie) => new UnWatchMovieSuccessAction(movie)),
            catchError(err => of(new UnWatchMovieFailureAction(err)))
        );

    @Effect()
    postUnWatchedMovieSuccess$ = this.actions$.ofType(WatchedMoviesActionTypes.UNWATCH_MOVIE_SUCCESS)
        .pipe(
            map((action: UnWatchMovieSuccessAction) => action.payload),
            switchMap((payload: Movie) => of(
                new UnWatchPopularMovieAction(payload),
                new UnWatchTopRatedMovieAction(payload),
                new UnWatchBookmarkedMovieAction(payload),
                new UnWatchRatedMovieAction(payload)
            ))
        );

    @Effect({ dispatch: false })
    postUnWatchedMovieFailure$ = this.actions$
        .ofType(WatchedMoviesActionTypes.UNWATCH_MOVIE_FAILURE);

}
