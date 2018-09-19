import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MoviesService } from '../../services';
import {
    MovieDetailsActionTypes, FetchMovieDetailsAction,
    FetchMovieDetailsSuccessAction, FetchMovieDetailsFailureAction
} from '../actions/movie-details.actions';
import { Movie } from '../../models/movie.model';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MovieDetailsEffects {
    constructor(private actions$: Actions, private movieService: MoviesService) { }
    @Effect()
    fetchMovieDetails$ = this.actions$.ofType(MovieDetailsActionTypes.FETCH_MOVIE_DETAILS)
        .pipe(
            map((action: FetchMovieDetailsAction) => action.payload),
            switchMap((payload) => this.movieService.fetchMovieDetails(payload)
                .pipe(
                    tap(movie => console.log(movie)),
                    map((movie: Movie) => new FetchMovieDetailsSuccessAction(movie)),
                    catchError(err => of(new FetchMovieDetailsFailureAction(err)))
                )
            ));


    @Effect({ dispatch: false })
    fetchMovieDetailsSuccess$ = this.actions$
        .ofType(MovieDetailsActionTypes.FETCH_MOVIE_DETAILS_SUCCESS);

    @Effect({ dispatch: false })
    fetchMovieDetailsFailure$ = this.actions$
        .ofType(MovieDetailsActionTypes.FETCH_MOVIE_DETAILS_FAILURE);
}



