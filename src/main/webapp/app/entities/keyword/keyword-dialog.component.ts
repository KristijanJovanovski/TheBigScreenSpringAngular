import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Keyword } from './keyword.model';
import { KeywordPopupService } from './keyword-popup.service';
import { KeywordService } from './keyword.service';
import { Movie, MovieService } from '../movie';

@Component({
    selector: 'jhi-keyword-dialog',
    templateUrl: './keyword-dialog.component.html'
})
export class KeywordDialogComponent implements OnInit {

    keyword: Keyword;
    isSaving: boolean;

    movies: Movie[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private keywordService: KeywordService,
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
        if (this.keyword.id !== undefined) {
            this.subscribeToSaveResponse(
                this.keywordService.update(this.keyword));
        } else {
            this.subscribeToSaveResponse(
                this.keywordService.create(this.keyword));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Keyword>>) {
        result.subscribe((res: HttpResponse<Keyword>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Keyword) {
        this.eventManager.broadcast({ name: 'keywordListModification', content: 'OK'});
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
    selector: 'jhi-keyword-popup',
    template: ''
})
export class KeywordPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private keywordPopupService: KeywordPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.keywordPopupService
                    .open(KeywordDialogComponent as Component, params['id']);
            } else {
                this.keywordPopupService
                    .open(KeywordDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
