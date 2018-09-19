import {
    BookmarkPopularMovieAction, UnBookmarkPopularMovieAction,
    UnBookmarkTopRatedMovieAction, UnBookmarkWatchedMovieAction,
    UnBookmarkRatedMovieAction, BookmarkTopRatedMovieAction,
    BookmarkWatchedMovieAction, BookmarkRatedMovieAction,
    BookmarkedMoviesActionTypes, FetchBookmarkedMoviesSuccessAction,
    FetchBookmarkedMoviesFailureAction, BookmarkMovieAction,
    BookmarkMovieSuccessAction, BookmarkMovieFailureAction,
    UnBookmarkMovieAction, UnBookmarkMovieFailureAction,
    UnBookmarkMovieSuccessAction,
    FetchBookmarkedMoviesAction
} from '../actions';

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MoviesService } from '../../services';
import { Page } from '../../models/page.model';
import { Movie } from '../../models/movie.model';


@Injectable()
export class BookmarkedMovieEffects {

    constructor(private actions$: Actions, private movieService: MoviesService) { }


    @Effect()
    fetchBookmarkedMovies$ = this.actions$.ofType(BookmarkedMoviesActionTypes.FETCH_BOOKMARKED_MOVIES)
        .pipe(
            map((action: FetchBookmarkedMoviesAction) => action.payload),
            switchMap((payload) => this.movieService.fetchBookmarkedMovies(payload.user, payload.page)
                .pipe(
                    map((page: Page<Movie>) => new FetchBookmarkedMoviesSuccessAction(page)),
                    catchError(err => of(new FetchBookmarkedMoviesFailureAction(err)))
                )
            ));

    @Effect({ dispatch: false })
    fetchBookmarkedMoviesSuccess$ = this.actions$
        .ofType(BookmarkedMoviesActionTypes.FETCH_BOOKMARKED_MOVIES_SUCCESS);

    @Effect({ dispatch: false })
    fetchBookmarkedMoviesFailure$ = this.actions$
        .ofType(BookmarkedMoviesActionTypes.FETCH_BOOKMARKED_MOVIES_FAILURE);

    @Effect()
    postBookmarkedMovie$ = this.actions$.ofType(BookmarkedMoviesActionTypes.BOOKMARK_MOVIE)
        .pipe(
            map((action: BookmarkMovieAction) => action.payload),
            switchMap((payload) => this.movieService.bookmarkMovie(payload.movie, payload.user)),
            map((movie: Movie) => new BookmarkMovieSuccessAction(movie)),
            catchError(err => of(new BookmarkMovieFailureAction(err)))
        );

    @Effect()
    postBookmarkedMovieSuccess$ = this.actions$.ofType(BookmarkedMoviesActionTypes.BOOKMARK_MOVIE_SUCCESS)
        .pipe(
            map((action: BookmarkMovieSuccessAction) => action.payload),
            switchMap((payload: Movie) => of(
                new BookmarkPopularMovieAction(payload),
                new BookmarkTopRatedMovieAction(payload),
                new BookmarkWatchedMovieAction(payload),
                new BookmarkRatedMovieAction(payload)
            ))
        );

    @Effect({ dispatch: false })
    postBookmarkedMovieFailure$ = this.actions$
        .ofType(BookmarkedMoviesActionTypes.BOOKMARK_MOVIE_FAILURE);

    @Effect()
    postUnBookmarkedMovie$ = this.actions$.ofType(BookmarkedMoviesActionTypes.UNBOOKMARK_MOVIE)
        .pipe(
            map((action: UnBookmarkMovieAction) => action.payload),
            switchMap((payload) => this.movieService.unBookmarkMovie(payload.movie, payload.user)),
            map((movie: Movie) => new UnBookmarkMovieSuccessAction(movie)),
            catchError(err => of(new UnBookmarkMovieFailureAction(err)))
        );

    @Effect()
    postUnBookmarkedMovieSuccess$ = this.actions$.ofType(BookmarkedMoviesActionTypes.UNBOOKMARK_MOVIE_SUCCESS)
        .pipe(
            map((action: UnBookmarkMovieSuccessAction) => action.payload),
            switchMap((payload: Movie) => of(
                new UnBookmarkPopularMovieAction(payload),
                new UnBookmarkTopRatedMovieAction(payload),
                new UnBookmarkWatchedMovieAction(payload),
                new UnBookmarkRatedMovieAction(payload)
            ))
        );

    @Effect({ dispatch: false })
    postUnBookmarkedMovieFailure$ = this.actions$
        .ofType(BookmarkedMoviesActionTypes.UNBOOKMARK_MOVIE_FAILURE);

}
