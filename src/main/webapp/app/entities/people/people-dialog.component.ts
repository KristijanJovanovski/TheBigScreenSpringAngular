import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { People } from './people.model';
import { PeoplePopupService } from './people-popup.service';
import { PeopleService } from './people.service';

@Component({
    selector: 'jhi-people-dialog',
    templateUrl: './people-dialog.component.html'
})
export class PeopleDialogComponent implements OnInit {

    people: People;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private peopleService: PeopleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.people.id !== undefined) {
            this.subscribeToSaveResponse(
                this.peopleService.update(this.people));
        } else {
            this.subscribeToSaveResponse(
                this.peopleService.create(this.people));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<People>>) {
        result.subscribe((res: HttpResponse<People>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: People) {
        this.eventManager.broadcast({ name: 'peopleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-people-popup',
    template: ''
})
export class PeoplePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private peoplePopupService: PeoplePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.peoplePopupService
                    .open(PeopleDialogComponent as Component, params['id']);
            } else {
                this.peoplePopupService
                    .open(PeopleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
