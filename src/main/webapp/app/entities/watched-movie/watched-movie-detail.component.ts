import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { WatchedMovie } from './watched-movie.model';
import { WatchedMovieService } from './watched-movie.service';

@Component({
    selector: 'jhi-watched-movie-detail',
    templateUrl: './watched-movie-detail.component.html'
})
export class WatchedMovieDetailComponent implements OnInit, OnDestroy {

    watchedMovie: WatchedMovie;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private watchedMovieService: WatchedMovieService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWatchedMovies();
    }

    load(id) {
        this.watchedMovieService.find(id)
            .subscribe((watchedMovieResponse: HttpResponse<WatchedMovie>) => {
                this.watchedMovie = watchedMovieResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWatchedMovies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'watchedMovieListModification',
            (response) => this.load(this.watchedMovie.id)
        );
    }
}
