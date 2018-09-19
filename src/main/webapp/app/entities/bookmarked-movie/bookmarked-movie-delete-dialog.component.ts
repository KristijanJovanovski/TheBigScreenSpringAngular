import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BookmarkedMovie } from './bookmarked-movie.model';
import { BookmarkedMoviePopupService } from './bookmarked-movie-popup.service';
import { BookmarkedMovieService } from './bookmarked-movie.service';

@Component({
    selector: 'jhi-bookmarked-movie-delete-dialog',
    templateUrl: './bookmarked-movie-delete-dialog.component.html'
})
export class BookmarkedMovieDeleteDialogComponent {

    bookmarkedMovie: BookmarkedMovie;

    constructor(
        private bookmarkedMovieService: BookmarkedMovieService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bookmarkedMovieService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bookmarkedMovieListModification',
                content: 'Deleted an bookmarkedMovie'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bookmarked-movie-delete-popup',
    template: ''
})
export class BookmarkedMovieDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bookmarkedMoviePopupService: BookmarkedMoviePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bookmarkedMoviePopupService
                .open(BookmarkedMovieDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
