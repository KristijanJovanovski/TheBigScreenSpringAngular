import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Keyword } from './keyword.model';
import { KeywordPopupService } from './keyword-popup.service';
import { KeywordService } from './keyword.service';

@Component({
    selector: 'jhi-keyword-delete-dialog',
    templateUrl: './keyword-delete-dialog.component.html'
})
export class KeywordDeleteDialogComponent {

    keyword: Keyword;

    constructor(
        private keywordService: KeywordService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.keywordService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'keywordListModification',
                content: 'Deleted an keyword'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-keyword-delete-popup',
    template: ''
})
export class KeywordDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private keywordPopupService: KeywordPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.keywordPopupService
                .open(KeywordDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
