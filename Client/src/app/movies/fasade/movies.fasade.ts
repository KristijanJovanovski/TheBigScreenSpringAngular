import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, map, tap, delay } from 'rxjs/operators';

import { Movie } from '../models/movie.model';
import { User } from '../../core/auth/user.model';

import { AuthSelectors } from '../../core';
import { MovieActions } from '../store/actions';

import {
    PopularMovieSelectors,
    TopRatedMovieSelectors,
    BookmarkedMovieSelectors,
    WatchedMovieSelectors,
    RatedMovieSelectors,
    MovieDetailsSelectors
} from '../store/selectors';


@Injectable(
    // {providedIn: 'root'}
)
export class MoviesFasade {

    user: User;
    singleMovie$: Observable<Movie>;

    popularMoviesSubject$$: BehaviorSubject<Movie[]>;
    popularMovies$: Observable<Movie[]>;
    popularMoviesFetching$: Observable<boolean>;
    popularMoviesCurrentPageNumber = -1;
    popualarMoviesTotalPages: number;

    topRatedMoviesSubject$$: BehaviorSubject<Movie[]>;
    topRatedMovies$: Observable<Movie[]>;
    topRatedMoviesFetching$: Observable<boolean>;
    topRatedMoviesCurrentPageNumber = -1;
    topRatedMoviesTotalPages: number;

    bookmarkedMoviesSubject$$: BehaviorSubject<Movie[]>;
    bookmarkedMovies$: Observable<Movie[]>;
    bookmarkedMoviesFetching$: Observable<boolean>;
    bookmarkedMoviesCurrentPageNumber = -1;
    bookmarkedMoviesTotalPages: number;

    watchedMoviesSubject$$: BehaviorSubject<Movie[]>;
    watchedMovies$: Observable<Movie[]>;
    watchedMoviesFetching$: Observable<boolean>;
    watchedMoviesCurrentPageNumber = -1;
    watchedMoviesTotalPages: number;

    ratedMoviesSubject$$: BehaviorSubject<Movie[]>;
    ratedMovies$: Observable<Movie[]>;
    ratedMoviesFetching$: Observable<boolean>;
    ratedMoviesCurrentPageNumber = -1;
    ratedMoviesTotalPages: number;

    posting$: Observable<boolean>;

    constructor(private store: Store<any>, private router: Router) {
        this.popularMoviesSubject$$ = new BehaviorSubject([]);
        this.popularMovies$ = this.popularMoviesSubject$$.asObservable();
        this.topRatedMoviesSubject$$ = new BehaviorSubject([]);
        this.topRatedMovies$ = this.topRatedMoviesSubject$$.asObservable();
        this.bookmarkedMoviesSubject$$ = new BehaviorSubject([]);
        this.bookmarkedMovies$ = this.bookmarkedMoviesSubject$$.asObservable();
        this.watchedMoviesSubject$$ = new BehaviorSubject([]);
        this.watchedMovies$ = this.watchedMoviesSubject$$.asObservable();
        this.ratedMoviesSubject$$ = new BehaviorSubject([]);
        this.ratedMovies$ = this.ratedMoviesSubject$$.asObservable();

        this.store.select(AuthSelectors.selectAuthUser).subscribe(user => this.user = user);
        this.singleMovie$ = this.store.select(MovieDetailsSelectors.selectMovieDetails);

        this.selectToPage();

        this.currentPageNumber();

        this.totalPages();

        this.fetching();

        this.posting();
    }
    getMovieDetails(id: number): any {
        this.store.dispatch(new MovieActions.MovieDetailsActionUnion.FetchMovieDetailsAction(id));
    }
    resetMovieDetails() {
        this.store.dispatch(new MovieActions.MovieDetailsActionUnion.ClearMovieDetailsAction);
    }

    getPopularNextPage(page: number): any {
        if (this.popularMoviesCurrentPageNumber < page &&
            this.popularMoviesCurrentPageNumber < this.popualarMoviesTotalPages) {
            this.store.dispatch(
                new MovieActions.PopularMoviesActionUnion.FetchPopularMoviesAction(
                    this.popularMoviesCurrentPageNumber
                )
            );
        } else {
            this.store.select(PopularMovieSelectors.selectPopularMoviesToPage(page))
                .subscribe(
                    movies => this.popularMoviesSubject$$.next(movies)
                ).unsubscribe();
        }
    }

    resetPupularSubjectLastValue() {
        this.store.select(PopularMovieSelectors.selectPopularMoviesByPage(0))
            .subscribe(
                movies => this.popularMoviesSubject$$.next(movies)
            ).unsubscribe();
    }

    getTopRatedNextPage(page: number): any {
        if (this.topRatedMoviesCurrentPageNumber < page &&
            this.topRatedMoviesCurrentPageNumber < this.popualarMoviesTotalPages) {
            this.store.dispatch(
                new MovieActions.TopRatedMoviesActionUnion.FetchTopRatedMoviesAction(
                    this.topRatedMoviesCurrentPageNumber
                )
            );
        } else {
            this.store.select(TopRatedMovieSelectors.selectTopRatedMoviesToPage(page))
                .subscribe(
                    movies => this.topRatedMoviesSubject$$.next(movies)
                ).unsubscribe();
        }
    }

    resetTopRatedSubjectLastValue() {
        this.store.select(TopRatedMovieSelectors.selectTopRatedMoviesByPage(0))
            .subscribe(
                movies => this.topRatedMoviesSubject$$.next(movies)
            ).unsubscribe();
    }

    getBookmarkedNextPage(page: number) {
        if (this.bookmarkedMoviesCurrentPageNumber < page &&
            this.bookmarkedMoviesCurrentPageNumber < this.bookmarkedMoviesTotalPages) {
            this.store.dispatch(
                new MovieActions.BookmarkedMoviesActionUnion.FetchBookmarkedMoviesAction(
                    { user: this.user, page: this.bookmarkedMoviesCurrentPageNumber }
                )
            );
        } else {
            this.store.select(BookmarkedMovieSelectors.selectBookmarkedMoviesToPage(page))
                .subscribe(
                    movies => this.bookmarkedMoviesSubject$$.next(movies)
                ).unsubscribe();
        }
    }

    resetBookmarkedSubjectLastValue() {
        this.store.select(BookmarkedMovieSelectors.selectBookmarkedMoviesByPage(0))
            .subscribe(
                movies => this.bookmarkedMoviesSubject$$.next(movies)
            ).unsubscribe();
    }

    getWatchedNextPage(page: number) {
        if (this.watchedMoviesCurrentPageNumber < page &&
            this.watchedMoviesCurrentPageNumber < this.watchedMoviesTotalPages) {
            this.store.dispatch(
                new MovieActions.WatchedMoviesActionUnion.FetchWatchedMoviesAction(
                    { user: this.user, page: this.watchedMoviesCurrentPageNumber }
                )
            );
        } else {
            this.store.select(WatchedMovieSelectors.selectWatchedMoviesToPage(page))
                .subscribe(
                    movies => this.watchedMoviesSubject$$.next(movies)
                ).unsubscribe();
        }
    }

    resetWatchedSubjectLastValue() {
        this.store.select(WatchedMovieSelectors.selectWatchedMoviesByPage(0))
            .subscribe(
                movies => this.watchedMoviesSubject$$.next(movies)
            ).unsubscribe();
    }

    getRatedNextPage(page: number) {
        if (this.ratedMoviesCurrentPageNumber < page &&
            this.ratedMoviesCurrentPageNumber < this.ratedMoviesTotalPages) {
            this.store.dispatch(
                new MovieActions.RatedMoviesActionUnion.FetchRatedMoviesAction(
                    { user: this.user, page: this.ratedMoviesCurrentPageNumber }
                )
            );
        } else {
            this.store.select(RatedMovieSelectors.selectRatedMoviesToPage(page))
                .subscribe(
                    movies => this.ratedMoviesSubject$$.next(movies)
                ).unsubscribe();
        }
    }

    resetRatedSubjectLastValue() {
        this.store.select(RatedMovieSelectors.selectRatedMoviesByPage(0))
            .subscribe(
                movies => this.ratedMoviesSubject$$.next(movies)
            ).unsubscribe();
    }
    bookmarkMovie(movie: Movie): any {
        if (this.user) {
            this.store.dispatch(
                new MovieActions.BookmarkedMoviesActionUnion.BookmarkMovieAction(
                    { movie: movie, user: this.user }
                )
            );
        } else {
            this.router.navigateByUrl('login');
        }
    }
    watchMovie(movie: Movie): any {
        if (this.user) {
            this.store.dispatch(
                new MovieActions.WatchedMoviesActionUnion.WatchMovieAction(
                    { movie: movie, user: this.user }
                )
            );
        } else {
            this.router.navigateByUrl('login');
        }
    }
    rateMovie(movie: Movie, val: number): any {
        if (this.user) {
            this.store.dispatch(
                new MovieActions.RatedMoviesActionUnion.RateMovieAction(
                    { movie: movie, user: this.user, rate: val }
                )
            );
        } else {
            this.router.navigateByUrl('login');
        }
    }
    unbookmarkMovie(movie: Movie): any {
        if (this.user) {
            this.store.dispatch(
                new MovieActions.BookmarkedMoviesActionUnion.UnBookmarkMovieAction(
                    { movie: movie, user: this.user }
                )
            );
        } else {
            this.router.navigateByUrl('login');
        }
    }
    unwatchMovie(movie: Movie): any {
        if (this.user) {
            this.store.dispatch(
                new MovieActions.WatchedMoviesActionUnion.UnWatchMovieAction(
                    { movie: movie, user: this.user }
                )
            );
        } else {
            this.router.navigateByUrl('login');
        }
    }
    unrateMovie(movie: Movie): any {
        if (this.user) {
            this.store.dispatch(
                new MovieActions.RatedMoviesActionUnion.UnRateMovieAction(
                    { movie: movie, user: this.user }
                )
            );
        } else {
            this.router.navigateByUrl('login');
        }
    }

    private selectToPage() {
        this.store.select(PopularMovieSelectors.selectPopularMovies).pipe(
            delay(500),
            switchMap(() => {
                return this.store.select(PopularMovieSelectors.selectPopularMoviesCurrentPageNumber).pipe(
                    switchMap(page =>
                        this.store.select(PopularMovieSelectors.selectPopularMoviesToPage(page)))
                );
            })
        ).subscribe(movies => this.popularMoviesSubject$$.next(movies));

        this.store.select(TopRatedMovieSelectors.selectTopRatedMovies).pipe(
            switchMap(() => {
                return this.store.select(TopRatedMovieSelectors.selectTopRatedMoviesCurrentPageNumber).pipe(
                    switchMap(page =>
                        this.store.select(TopRatedMovieSelectors.selectTopRatedMoviesToPage(page)))
                );
            })
        ).subscribe(movies => this.topRatedMoviesSubject$$.next(movies));

        this.store.select(BookmarkedMovieSelectors.selectBookmarkedMovies).pipe(
            switchMap(() => {
                return this.store.select(BookmarkedMovieSelectors.selectBookmarkedMoviesCurrentPageNumber).pipe(
                    switchMap(page =>
                        this.store.select(BookmarkedMovieSelectors.selectBookmarkedMoviesToPage(page)))
                );
            })
        ).subscribe(movies => this.bookmarkedMoviesSubject$$.next(movies));

        this.store.select(WatchedMovieSelectors.selectWatchedMovies).pipe(
            switchMap(() => {
                return this.store.select(WatchedMovieSelectors.selectWatchedMoviesCurrentPageNumber).pipe(
                    switchMap(page =>
                        this.store.select(WatchedMovieSelectors.selectWatchedMoviesToPage(page)))
                );
            })
        ).subscribe(movies => this.watchedMoviesSubject$$.next(movies));

        this.store.select(RatedMovieSelectors.selectRatedMovies).pipe(
            switchMap(() => {
                return this.store.select(RatedMovieSelectors.selectRatedMoviesCurrentPageNumber).pipe(
                    switchMap(page =>
                        this.store.select(RatedMovieSelectors.selectRatedMoviesToPage(page)))
                );
            })
        ).subscribe(movies => this.ratedMoviesSubject$$.next(movies));
    }

    private currentPageNumber() {
        this.store.select(PopularMovieSelectors.selectPopularMoviesCurrentPageNumber)
            .subscribe(page => this.popularMoviesCurrentPageNumber = page);
        this.store.select(TopRatedMovieSelectors.selectTopRatedMoviesCurrentPageNumber)
            .subscribe(page => this.topRatedMoviesCurrentPageNumber = page);
        this.store.select(BookmarkedMovieSelectors.selectBookmarkedMoviesCurrentPageNumber)
            .subscribe(page => this.bookmarkedMoviesCurrentPageNumber = page);
        this.store.select(WatchedMovieSelectors.selectWatchedMoviesCurrentPageNumber)
            .subscribe(page => this.watchedMoviesCurrentPageNumber = page);
        this.store.select(RatedMovieSelectors.selectRatedMoviesCurrentPageNumber)
            .subscribe(page => this.ratedMoviesCurrentPageNumber = page);
    }

    private totalPages() {
        this.store.select(PopularMovieSelectors.selectPopularMoviesTotalPages)
            .subscribe(totalPages => this.popualarMoviesTotalPages = totalPages);
        this.store.select(TopRatedMovieSelectors.selectTopRatedMoviesTotalPages)
            .subscribe(totalPages => this.topRatedMoviesTotalPages = totalPages);
        this.store.select(BookmarkedMovieSelectors.selectBookmarkedMoviesTotalPages)
            .subscribe(totalPages => this.bookmarkedMoviesTotalPages = totalPages);
        this.store.select(WatchedMovieSelectors.selectWatchedMoviesTotalPages)
            .subscribe(totalPages => this.watchedMoviesTotalPages = totalPages);
        this.store.select(RatedMovieSelectors.selectRatedMoviesTotalPages)
            .subscribe(totalPages => this.ratedMoviesTotalPages = totalPages);
    }

    private fetching() {
        this.popularMoviesFetching$ = this.store.select(PopularMovieSelectors.selectPopularMoviesFetching);
        this.topRatedMoviesFetching$ = this.store.select(TopRatedMovieSelectors.selectTopRatedMoviesFetching);
        this.bookmarkedMoviesFetching$ = this.store.select(BookmarkedMovieSelectors.selectBookmarkedMoviesFetching);
        this.watchedMoviesFetching$ = this.store.select(WatchedMovieSelectors.selectWatchedMoviesFetching);
        this.ratedMoviesFetching$ = this.store.select(RatedMovieSelectors.selectRatedMoviesFetching);

    }

    private posting() {
        this.posting$ = combineLatest(
            this.store.select(BookmarkedMovieSelectors.selectBookmarkedMoviesPosting),
            this.store.select(WatchedMovieSelectors.selectWatchedMoviesPosting),
            this.store.select(RatedMovieSelectors.selectRatedMoviesPosting),
            (bookmarked, watched, rated) => [bookmarked, watched, rated]
        ).pipe(
            map(postings => postings.reduce((acc, curr) => acc || curr, false)),
            // tap(posting => console.log(`Posting ${posting}`)),
        );
    }
}
