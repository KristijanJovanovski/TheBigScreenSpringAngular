import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RatedMovie } from './rated-movie.model';
import { RatedMoviePopupService } from './rated-movie-popup.service';
import { RatedMovieService } from './rated-movie.service';
import { Movie, MovieService } from '../movie';
import { Profile, ProfileService } from '../profile';

@Component({
    selector: 'jhi-rated-movie-dialog',
    templateUrl: './rated-movie-dialog.component.html'
})
export class RatedMovieDialogComponent implements OnInit {

    ratedMovie: RatedMovie;
    isSaving: boolean;

    movies: Movie[];

    profiles: Profile[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ratedMovieService: RatedMovieService,
        private movieService: MovieService,
        private profileService: ProfileService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.movieService.query()
            .subscribe((res: HttpResponse<Movie[]>) => { this.movies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.profileService.query()
            .subscribe((res: HttpResponse<Profile[]>) => { this.profiles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ratedMovie.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ratedMovieService.update(this.ratedMovie));
        } else {
            this.subscribeToSaveResponse(
                this.ratedMovieService.create(this.ratedMovie));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RatedMovie>>) {
        result.subscribe((res: HttpResponse<RatedMovie>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RatedMovie) {
        this.eventManager.broadcast({ name: 'ratedMovieListModification', content: 'OK'});
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

    trackProfileById(index: number, item: Profile) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rated-movie-popup',
    template: ''
})
export class RatedMoviePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ratedMoviePopupService: RatedMoviePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ratedMoviePopupService
                    .open(RatedMovieDialogComponent as Component, params['id']);
            } else {
                this.ratedMoviePopupService
                    .open(RatedMovieDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
