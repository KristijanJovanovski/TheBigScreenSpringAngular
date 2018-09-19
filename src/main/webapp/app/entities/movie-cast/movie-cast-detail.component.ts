import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MovieCast } from './movie-cast.model';
import { MovieCastService } from './movie-cast.service';

@Component({
    selector: 'jhi-movie-cast-detail',
    templateUrl: './movie-cast-detail.component.html'
})
export class MovieCastDetailComponent implements OnInit, OnDestroy {

    movieCast: MovieCast;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private movieCastService: MovieCastService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMovieCasts();
    }

    load(id) {
        this.movieCastService.find(id)
            .subscribe((movieCastResponse: HttpResponse<MovieCast>) => {
                this.movieCast = movieCastResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMovieCasts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'movieCastListModification',
            (response) => this.load(this.movieCast.id)
        );
    }
}
