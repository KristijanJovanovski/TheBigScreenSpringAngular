import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RatedMovie } from './rated-movie.model';
import { RatedMovieService } from './rated-movie.service';

@Component({
    selector: 'jhi-rated-movie-detail',
    templateUrl: './rated-movie-detail.component.html'
})
export class RatedMovieDetailComponent implements OnInit, OnDestroy {

    ratedMovie: RatedMovie;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ratedMovieService: RatedMovieService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRatedMovies();
    }

    load(id) {
        this.ratedMovieService.find(id)
            .subscribe((ratedMovieResponse: HttpResponse<RatedMovie>) => {
                this.ratedMovie = ratedMovieResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRatedMovies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ratedMovieListModification',
            (response) => this.load(this.ratedMovie.id)
        );
    }
}
