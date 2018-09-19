import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MovieCrew } from './movie-crew.model';
import { MovieCrewService } from './movie-crew.service';

@Component({
    selector: 'jhi-movie-crew-detail',
    templateUrl: './movie-crew-detail.component.html'
})
export class MovieCrewDetailComponent implements OnInit, OnDestroy {

    movieCrew: MovieCrew;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private movieCrewService: MovieCrewService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMovieCrews();
    }

    load(id) {
        this.movieCrewService.find(id)
            .subscribe((movieCrewResponse: HttpResponse<MovieCrew>) => {
                this.movieCrew = movieCrewResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMovieCrews() {
        this.eventSubscriber = this.eventManager.subscribe(
            'movieCrewListModification',
            (response) => this.load(this.movieCrew.id)
        );
    }
}
