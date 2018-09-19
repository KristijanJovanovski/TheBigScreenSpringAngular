import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TmdbImage } from './tmdb-image.model';
import { TmdbImageService } from './tmdb-image.service';

@Component({
    selector: 'jhi-tmdb-image-detail',
    templateUrl: './tmdb-image-detail.component.html'
})
export class TmdbImageDetailComponent implements OnInit, OnDestroy {

    tmdbImage: TmdbImage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tmdbImageService: TmdbImageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTmdbImages();
    }

    load(id) {
        this.tmdbImageService.find(id)
            .subscribe((tmdbImageResponse: HttpResponse<TmdbImage>) => {
                this.tmdbImage = tmdbImageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTmdbImages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tmdbImageListModification',
            (response) => this.load(this.tmdbImage.id)
        );
    }
}
