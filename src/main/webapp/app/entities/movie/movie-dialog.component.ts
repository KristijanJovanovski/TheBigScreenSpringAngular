import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Movie } from './movie.model';
import { MoviePopupService } from './movie-popup.service';
import { MovieService } from './movie.service';
import { Genre, GenreService } from '../genre';
import { Keyword, KeywordService } from '../keyword';

@Component({
    selector: 'jhi-movie-dialog',
    templateUrl: './movie-dialog.component.html'
})
export class MovieDialogComponent implements OnInit {

    movie: Movie;
    isSaving: boolean;

    genres: Genre[];

    keywords: Keyword[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private movieService: MovieService,
        private genreService: GenreService,
        private keywordService: KeywordService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.genreService.query()
            .subscribe((res: HttpResponse<Genre[]>) => { this.genres = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.keywordService.query()
            .subscribe((res: HttpResponse<Keyword[]>) => { this.keywords = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.movie.id !== undefined) {
            this.subscribeToSaveResponse(
                this.movieService.update(this.movie));
        } else {
            this.subscribeToSaveResponse(
                this.movieService.create(this.movie));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Movie>>) {
        result.subscribe((res: HttpResponse<Movie>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Movie) {
        this.eventManager.broadcast({ name: 'movieListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackGenreById(index: number, item: Genre) {
        return item.id;
    }

    trackKeywordById(index: number, item: Keyword) {
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
    selector: 'jhi-movie-popup',
    template: ''
})
export class MoviePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private moviePopupService: MoviePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.moviePopupService
                    .open(MovieDialogComponent as Component, params['id']);
            } else {
                this.moviePopupService
                    .open(MovieDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
