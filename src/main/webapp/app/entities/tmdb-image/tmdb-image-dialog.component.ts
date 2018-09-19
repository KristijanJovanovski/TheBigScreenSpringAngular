import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TmdbImage } from './tmdb-image.model';
import { TmdbImagePopupService } from './tmdb-image-popup.service';
import { TmdbImageService } from './tmdb-image.service';
import { Movie, MovieService } from '../movie';
import { People, PeopleService } from '../people';

@Component({
    selector: 'jhi-tmdb-image-dialog',
    templateUrl: './tmdb-image-dialog.component.html'
})
export class TmdbImageDialogComponent implements OnInit {

    tmdbImage: TmdbImage;
    isSaving: boolean;

    movies: Movie[];

    people: People[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tmdbImageService: TmdbImageService,
        private movieService: MovieService,
        private peopleService: PeopleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.movieService.query()
            .subscribe((res: HttpResponse<Movie[]>) => { this.movies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.peopleService.query()
            .subscribe((res: HttpResponse<People[]>) => { this.people = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tmdbImage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tmdbImageService.update(this.tmdbImage));
        } else {
            this.subscribeToSaveResponse(
                this.tmdbImageService.create(this.tmdbImage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TmdbImage>>) {
        result.subscribe((res: HttpResponse<TmdbImage>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TmdbImage) {
        this.eventManager.broadcast({ name: 'tmdbImageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMovieById(index: number, item: Movie) {
        return item.id;
    }

    trackPeopleById(index: number, item: People) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tmdb-image-popup',
    template: ''
})
export class TmdbImagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tmdbImagePopupService: TmdbImagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tmdbImagePopupService
                    .open(TmdbImageDialogComponent as Component, params['id']);
            } else {
                this.tmdbImagePopupService
                    .open(TmdbImageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
