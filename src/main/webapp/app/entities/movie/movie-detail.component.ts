import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Component({
    selector: 'jhi-movie-detail',
    templateUrl: './movie-detail.component.html'
})
export class MovieDetailComponent implements OnInit, OnDestroy {

    movie: Movie;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private movieService: MovieService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMovies();
    }

    load(id) {
        this.movieService.find(id)
            .subscribe((movieResponse: HttpResponse<Movie>) => {
                this.movie = movieResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMovies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'movieListModification',
            (response) => this.load(this.movie.id)
        );
    }
}
