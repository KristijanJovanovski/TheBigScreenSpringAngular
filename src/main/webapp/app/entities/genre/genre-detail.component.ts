import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Genre } from './genre.model';
import { GenreService } from './genre.service';

@Component({
    selector: 'jhi-genre-detail',
    templateUrl: './genre-detail.component.html'
})
export class GenreDetailComponent implements OnInit, OnDestroy {

    genre: Genre;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private genreService: GenreService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGenres();
    }

    load(id) {
        this.genreService.find(id)
            .subscribe((genreResponse: HttpResponse<Genre>) => {
                this.genre = genreResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGenres() {
        this.eventSubscriber = this.eventManager.subscribe(
            'genreListModification',
            (response) => this.load(this.genre.id)
        );
    }
}
