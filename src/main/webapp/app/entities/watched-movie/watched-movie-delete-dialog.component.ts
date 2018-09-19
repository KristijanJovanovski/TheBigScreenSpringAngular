import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WatchedMovie } from './watched-movie.model';
import { WatchedMoviePopupService } from './watched-movie-popup.service';
import { WatchedMovieService } from './watched-movie.service';

@Component({
    selector: 'jhi-watched-movie-delete-dialog',
    templateUrl: './watched-movie-delete-dialog.component.html'
})
export class WatchedMovieDeleteDialogComponent {

    watchedMovie: WatchedMovie;

    constructor(
        private watchedMovieService: WatchedMovieService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.watchedMovieService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'watchedMovieListModification',
                content: 'Deleted an watchedMovie'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-watched-movie-delete-popup',
    template: ''
})
export class WatchedMovieDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private watchedMoviePopupService: WatchedMoviePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.watchedMoviePopupService
                .open(WatchedMovieDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
