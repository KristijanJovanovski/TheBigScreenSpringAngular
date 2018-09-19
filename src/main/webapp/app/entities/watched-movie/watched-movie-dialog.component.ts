import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WatchedMovie } from './watched-movie.model';
import { WatchedMoviePopupService } from './watched-movie-popup.service';
import { WatchedMovieService } from './watched-movie.service';
import { Movie, MovieService } from '../movie';
import { Profile, ProfileService } from '../profile';

@Component({
    selector: 'jhi-watched-movie-dialog',
    templateUrl: './watched-movie-dialog.component.html'
})
export class WatchedMovieDialogComponent implements OnInit {

    watchedMovie: WatchedMovie;
    isSaving: boolean;

    movies: Movie[];

    profiles: Profile[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private watchedMovieService: WatchedMovieService,
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
        if (this.watchedMovie.id !== undefined) {
            this.subscribeToSaveResponse(
                this.watchedMovieService.update(this.watchedMovie));
        } else {
            this.subscribeToSaveResponse(
                this.watchedMovieService.create(this.watchedMovie));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<WatchedMovie>>) {
        result.subscribe((res: HttpResponse<WatchedMovie>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: WatchedMovie) {
        this.eventManager.broadcast({ name: 'watchedMovieListModification', content: 'OK'});
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
    selector: 'jhi-watched-movie-popup',
    template: ''
})
export class WatchedMoviePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private watchedMoviePopupService: WatchedMoviePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.watchedMoviePopupService
                    .open(WatchedMovieDialogComponent as Component, params['id']);
            } else {
                this.watchedMoviePopupService
                    .open(WatchedMovieDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
