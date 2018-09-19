import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TmdbImage } from './tmdb-image.model';
import { TmdbImagePopupService } from './tmdb-image-popup.service';
import { TmdbImageService } from './tmdb-image.service';

@Component({
    selector: 'jhi-tmdb-image-delete-dialog',
    templateUrl: './tmdb-image-delete-dialog.component.html'
})
export class TmdbImageDeleteDialogComponent {

    tmdbImage: TmdbImage;

    constructor(
        private tmdbImageService: TmdbImageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tmdbImageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tmdbImageListModification',
                content: 'Deleted an tmdbImage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tmdb-image-delete-popup',
    template: ''
})
export class TmdbImageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tmdbImagePopupService: TmdbImagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tmdbImagePopupService
                .open(TmdbImageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
