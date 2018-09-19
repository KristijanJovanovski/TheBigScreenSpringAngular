import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Genre } from './genre.model';
import { GenrePopupService } from './genre-popup.service';
import { GenreService } from './genre.service';
import { Movie, MovieService } from '../movie';

@Component({
    selector: 'jhi-genre-dialog',
    templateUrl: './genre-dialog.component.html'
})
export class GenreDialogComponent implements OnInit {

    genre: Genre;
    isSaving: boolean;

    movies: Movie[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private genreService: GenreService,
        private movieService: MovieService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.movieService.query()
            .subscribe((res: HttpResponse<Movie[]>) => { this.movies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.genre.id !== undefined) {
            this.subscribeToSaveResponse(
                this.genreService.update(this.genre));
        } else {
            this.subscribeToSaveResponse(
                this.genreService.create(this.genre));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Genre>>) {
        result.subscribe((res: HttpResponse<Genre>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Genre) {
        this.eventManager.broadcast({ name: 'genreListModification', content: 'OK'});
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-genre-popup',
    template: ''
})
export class GenrePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private genrePopupService: GenrePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.genrePopupService
                    .open(GenreDialogComponent as Component, params['id']);
            } else {
                this.genrePopupService
                    .open(GenreDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
