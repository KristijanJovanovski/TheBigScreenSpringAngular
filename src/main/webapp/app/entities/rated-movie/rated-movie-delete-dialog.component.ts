import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RatedMovie } from './rated-movie.model';
import { RatedMoviePopupService } from './rated-movie-popup.service';
import { RatedMovieService } from './rated-movie.service';

@Component({
    selector: 'jhi-rated-movie-delete-dialog',
    templateUrl: './rated-movie-delete-dialog.component.html'
})
export class RatedMovieDeleteDialogComponent {

    ratedMovie: RatedMovie;

    constructor(
        private ratedMovieService: RatedMovieService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ratedMovieService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ratedMovieListModification',
                content: 'Deleted an ratedMovie'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rated-movie-delete-popup',
    template: ''
})
export class RatedMovieDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ratedMoviePopupService: RatedMoviePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ratedMoviePopupService
                .open(RatedMovieDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
