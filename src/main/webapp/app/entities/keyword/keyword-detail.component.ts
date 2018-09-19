import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Keyword } from './keyword.model';
import { KeywordService } from './keyword.service';

@Component({
    selector: 'jhi-keyword-detail',
    templateUrl: './keyword-detail.component.html'
})
export class KeywordDetailComponent implements OnInit, OnDestroy {

    keyword: Keyword;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private keywordService: KeywordService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInKeywords();
    }

    load(id) {
        this.keywordService.find(id)
            .subscribe((keywordResponse: HttpResponse<Keyword>) => {
                this.keyword = keywordResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInKeywords() {
        this.eventSubscriber = this.eventManager.subscribe(
            'keywordListModification',
            (response) => this.load(this.keyword.id)
        );
    }
}
