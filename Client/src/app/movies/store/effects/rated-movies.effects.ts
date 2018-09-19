import {
    RatePopularMovieAction, UnRatePopularMovieAction,
    UnRateTopRatedMovieAction, UnRateWatchedMovieAction,
    UnRateBookmarkedMovieAction, RateTopRatedMovieAction,
    RateWatchedMovieAction, RateBookmarkedMovieAction,
    RatedMoviesActionTypes, FetchRatedMoviesSuccessAction,
    FetchRatedMoviesFailureAction, RateMovieAction,
    RateMovieSuccessAction, RateMovieFailureAction,
    UnRateMovieAction, UnRateMovieFailureAction,
    UnRateMovieSuccessAction,
    FetchRatedMoviesAction
} from '../actions';

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MoviesService } from '../../services';
import { Page } from '../../models/page.model';
import { Movie } from '../../models/movie.model';


@Injectable()
export class RatedMovieEffects {

    constructor(private actions$: Actions, private movieService: MoviesService) { }


    @Effect()
    fetchRatedMovies$ = this.actions$.ofType(RatedMoviesActionTypes.FETCH_RATED_MOVIES)
        .pipe(
            map((action: FetchRatedMoviesAction) => action.payload),
            switchMap((payload) => this.movieService.fetchRatedMovies(payload.user, payload.page).pipe(
                map((page: Page<Movie>) => new FetchRatedMoviesSuccessAction(page)),
                catchError(err => of(new FetchRatedMoviesFailureAction(err)))
            )
            ));

    @Effect({ dispatch: false })
    fetchRatedMoviesSuccess$ = this.actions$
        .ofType(RatedMoviesActionTypes.FETCH_RATED_MOVIES_SUCCESS);

    @Effect({ dispatch: false })
    fetchRatedMoviesFailure$ = this.actions$
        .ofType(RatedMoviesActionTypes.FETCH_RATED_MOVIES_FAILURE);

    @Effect()
    postRatedMovie$ = this.actions$.ofType(RatedMoviesActionTypes.RATE_MOVIE)
        .pipe(
            map((action: RateMovieAction) => action.payload),
            switchMap((payload) => this.movieService.rateMovie(payload.movie, payload.user, payload.rate)),
            map((movie: Movie) => new RateMovieSuccessAction(movie)),
            catchError(err => of(new RateMovieFailureAction(err)))
        );

    @Effect()
    postRatedMovieSuccess$ = this.actions$.ofType(RatedMoviesActionTypes.RATE_MOVIE_SUCCESS)
        .pipe(
            map((action: RateMovieSuccessAction) => action.payload),
            switchMap((payload: Movie) => of(
                new RatePopularMovieAction(payload),
                new RateTopRatedMovieAction(payload),
                new RateWatchedMovieAction(payload),
                new RateBookmarkedMovieAction(payload)
            ))
        );

    @Effect({ dispatch: false })
    postRatedMovieFailure$ = this.actions$
        .ofType(RatedMoviesActionTypes.RATE_MOVIE_FAILURE);

    @Effect()
    postUnRatedMovie$ = this.actions$.ofType(RatedMoviesActionTypes.UNRATE_MOVIE)
        .pipe(
            map((action: UnRateMovieAction) => action.payload),
            switchMap((payload) => this.movieService.unRateMovie(payload.movie, payload.user)),
            map((movie: Movie) => new UnRateMovieSuccessAction(movie)),
            catchError(err => of(new UnRateMovieFailureAction(err)))
        );

    @Effect()
    postUnRatedMovieSuccess$ = this.actions$.ofType(RatedMoviesActionTypes.UNRATE_MOVIE_SUCCESS)
        .pipe(
            map((action: UnRateMovieSuccessAction) => action.payload),
            switchMap((payload: Movie) => of(
                new UnRatePopularMovieAction(payload),
                new UnRateTopRatedMovieAction(payload),
                new UnRateWatchedMovieAction(payload),
                new UnRateBookmarkedMovieAction(payload)
            ))
        );

    @Effect({ dispatch: false })
    postUnRatedMovieFailure$ = this.actions$
        .ofType(RatedMoviesActionTypes.UNRATE_MOVIE_FAILURE);

}
