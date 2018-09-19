import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Video } from './video.model';
import { VideoService } from './video.service';

@Component({
    selector: 'jhi-video-detail',
    templateUrl: './video-detail.component.html'
})
export class VideoDetailComponent implements OnInit, OnDestroy {

    video: Video;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private videoService: VideoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVideos();
    }

    load(id) {
        this.videoService.find(id)
            .subscribe((videoResponse: HttpResponse<Video>) => {
                this.video = videoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVideos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'videoListModification',
            (response) => this.load(this.video.id)
        );
    }
}
