import {
    PopularMoviesActionTypes, FetchPopularMoviesSuccessAction,
    FetchPopularMoviesFailureAction,
    FetchPopularMoviesAction
} from '../actions';

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { MoviesService } from '../../services/movies.service';
import { of } from 'rxjs';
import { Page } from '../../models/page.model';
import { Movie } from '../../models/movie.model';


@Injectable()
export class PopularMovieEffects {

    constructor(private actions$: Actions, private movieService: MoviesService) { }

    @Effect()
    fetchPopularMovies$ = this.actions$.ofType(PopularMoviesActionTypes.FETCH_POPULAR_MOVIES)
        .pipe(
            map((action: FetchPopularMoviesAction) => action.payload),
            switchMap((payload) => this.movieService.fetchPopularMovies(payload)),
            map((page: Page<Movie>) => new FetchPopularMoviesSuccessAction(page)),
            catchError(err => of(new FetchPopularMoviesFailureAction(err)))
        );
}
