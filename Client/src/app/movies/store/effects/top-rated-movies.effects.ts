import {
    TopRatedMoviesActionTypes, FetchTopRatedMoviesSuccessAction,
    FetchTopRatedMoviesFailureAction,
    FetchTopRatedMoviesAction
} from '../actions';

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { MoviesService } from '../../services/movies.service';
import { of } from 'rxjs';
import { Page } from '../../models/page.model';
import { Movie } from '../../models/movie.model';


@Injectable()
export class TopRatedMovieEffects {

    constructor(private actions$: Actions, private movieService: MoviesService) { }

    @Effect()
    fetchTopRatedMovies$ = this.actions$.ofType(TopRatedMoviesActionTypes.FETCH_TOP_RATED_MOVIES)
        .pipe(
            map((action: FetchTopRatedMoviesAction) => action.payload),
            switchMap((payload) => this.movieService.fetchTopRatedMovies(payload)),
            map((page: Page<Movie>) => new FetchTopRatedMoviesSuccessAction(page)),
            catchError(err => of(new FetchTopRatedMoviesFailureAction(err)))
        );
}
