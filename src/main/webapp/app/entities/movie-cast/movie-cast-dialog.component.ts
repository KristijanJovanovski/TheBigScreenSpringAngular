import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MovieCast } from './movie-cast.model';
import { MovieCastPopupService } from './movie-cast-popup.service';
import { MovieCastService } from './movie-cast.service';
import { Movie, MovieService } from '../movie';
import { People, PeopleService } from '../people';

@Component({
    selector: 'jhi-movie-cast-dialog',
    templateUrl: './movie-cast-dialog.component.html'
})
export class MovieCastDialogComponent implements OnInit {

    movieCast: MovieCast;
    isSaving: boolean;

    movies: Movie[];

    people: People[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private movieCastService: MovieCastService,
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
        if (this.movieCast.id !== undefined) {
            this.subscribeToSaveResponse(
                this.movieCastService.update(this.movieCast));
        } else {
            this.subscribeToSaveResponse(
                this.movieCastService.create(this.movieCast));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MovieCast>>) {
        result.subscribe((res: HttpResponse<MovieCast>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MovieCast) {
        this.eventManager.broadcast({ name: 'movieCastListModification', content: 'OK'});
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
    selector: 'jhi-movie-cast-popup',
    template: ''
})
export class MovieCastPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private movieCastPopupService: MovieCastPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.movieCastPopupService
                    .open(MovieCastDialogComponent as Component, params['id']);
            } else {
                this.movieCastPopupService
                    .open(MovieCastDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
