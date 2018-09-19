import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MovieCast } from './movie-cast.model';
import { MovieCastPopupService } from './movie-cast-popup.service';
import { MovieCastService } from './movie-cast.service';

@Component({
    selector: 'jhi-movie-cast-delete-dialog',
    templateUrl: './movie-cast-delete-dialog.component.html'
})
export class MovieCastDeleteDialogComponent {

    movieCast: MovieCast;

    constructor(
        private movieCastService: MovieCastService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.movieCastService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'movieCastListModification',
                content: 'Deleted an movieCast'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-movie-cast-delete-popup',
    template: ''
})
export class MovieCastDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private movieCastPopupService: MovieCastPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.movieCastPopupService
                .open(MovieCastDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
