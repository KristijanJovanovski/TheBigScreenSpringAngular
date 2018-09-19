import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BookmarkedMovie } from './bookmarked-movie.model';
import { BookmarkedMovieService } from './bookmarked-movie.service';

@Component({
    selector: 'jhi-bookmarked-movie-detail',
    templateUrl: './bookmarked-movie-detail.component.html'
})
export class BookmarkedMovieDetailComponent implements OnInit, OnDestroy {

    bookmarkedMovie: BookmarkedMovie;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bookmarkedMovieService: BookmarkedMovieService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBookmarkedMovies();
    }

    load(id) {
        this.bookmarkedMovieService.find(id)
            .subscribe((bookmarkedMovieResponse: HttpResponse<BookmarkedMovie>) => {
                this.bookmarkedMovie = bookmarkedMovieResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBookmarkedMovies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bookmarkedMovieListModification',
            (response) => this.load(this.bookmarkedMovie.id)
        );
    }
}
