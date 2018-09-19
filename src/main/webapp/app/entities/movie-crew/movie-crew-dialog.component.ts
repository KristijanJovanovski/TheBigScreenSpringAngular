import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MovieCrew } from './movie-crew.model';
import { MovieCrewPopupService } from './movie-crew-popup.service';
import { MovieCrewService } from './movie-crew.service';
import { Movie, MovieService } from '../movie';
import { People, PeopleService } from '../people';

@Component({
    selector: 'jhi-movie-crew-dialog',
    templateUrl: './movie-crew-dialog.component.html'
})
export class MovieCrewDialogComponent implements OnInit {

    movieCrew: MovieCrew;
    isSaving: boolean;

    movies: Movie[];

    people: People[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private movieCrewService: MovieCrewService,
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
        if (this.movieCrew.id !== undefined) {
            this.subscribeToSaveResponse(
                this.movieCrewService.update(this.movieCrew));
        } else {
            this.subscribeToSaveResponse(
                this.movieCrewService.create(this.movieCrew));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MovieCrew>>) {
        result.subscribe((res: HttpResponse<MovieCrew>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MovieCrew) {
        this.eventManager.broadcast({ name: 'movieCrewListModification', content: 'OK'});
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
    selector: 'jhi-movie-crew-popup',
    template: ''
})
export class MovieCrewPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private movieCrewPopupService: MovieCrewPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.movieCrewPopupService
                    .open(MovieCrewDialogComponent as Component, params['id']);
            } else {
                this.movieCrewPopupService
                    .open(MovieCrewDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
