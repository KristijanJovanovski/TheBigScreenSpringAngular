import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MovieCrew } from './movie-crew.model';
import { MovieCrewPopupService } from './movie-crew-popup.service';
import { MovieCrewService } from './movie-crew.service';

@Component({
    selector: 'jhi-movie-crew-delete-dialog',
    templateUrl: './movie-crew-delete-dialog.component.html'
})
export class MovieCrewDeleteDialogComponent {

    movieCrew: MovieCrew;

    constructor(
        private movieCrewService: MovieCrewService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.movieCrewService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'movieCrewListModification',
                content: 'Deleted an movieCrew'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-movie-crew-delete-popup',
    template: ''
})
export class MovieCrewDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private movieCrewPopupService: MovieCrewPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.movieCrewPopupService
                .open(MovieCrewDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
