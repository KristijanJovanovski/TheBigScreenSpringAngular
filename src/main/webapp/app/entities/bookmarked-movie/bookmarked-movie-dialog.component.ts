import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BookmarkedMovie } from './bookmarked-movie.model';
import { BookmarkedMoviePopupService } from './bookmarked-movie-popup.service';
import { BookmarkedMovieService } from './bookmarked-movie.service';
import { Movie, MovieService } from '../movie';
import { Profile, ProfileService } from '../profile';

@Component({
    selector: 'jhi-bookmarked-movie-dialog',
    templateUrl: './bookmarked-movie-dialog.component.html'
})
export class BookmarkedMovieDialogComponent implements OnInit {

    bookmarkedMovie: BookmarkedMovie;
    isSaving: boolean;

    movies: Movie[];

    profiles: Profile[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bookmarkedMovieService: BookmarkedMovieService,
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
        if (this.bookmarkedMovie.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bookmarkedMovieService.update(this.bookmarkedMovie));
        } else {
            this.subscribeToSaveResponse(
                this.bookmarkedMovieService.create(this.bookmarkedMovie));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BookmarkedMovie>>) {
        result.subscribe((res: HttpResponse<BookmarkedMovie>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BookmarkedMovie) {
        this.eventManager.broadcast({ name: 'bookmarkedMovieListModification', content: 'OK'});
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
    selector: 'jhi-bookmarked-movie-popup',
    template: ''
})
export class BookmarkedMoviePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bookmarkedMoviePopupService: BookmarkedMoviePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bookmarkedMoviePopupService
                    .open(BookmarkedMovieDialogComponent as Component, params['id']);
            } else {
                this.bookmarkedMoviePopupService
                    .open(BookmarkedMovieDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
