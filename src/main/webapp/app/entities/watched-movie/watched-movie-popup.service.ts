import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { WatchedMovie } from './watched-movie.model';
import { WatchedMovieService } from './watched-movie.service';

@Injectable()
export class WatchedMoviePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private watchedMovieService: WatchedMovieService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.watchedMovieService.find(id)
                    .subscribe((watchedMovieResponse: HttpResponse<WatchedMovie>) => {
                        const watchedMovie: WatchedMovie = watchedMovieResponse.body;
                        watchedMovie.createdOn = this.datePipe
                            .transform(watchedMovie.createdOn, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.watchedMovieModalRef(component, watchedMovie);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.watchedMovieModalRef(component, new WatchedMovie());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    watchedMovieModalRef(component: Component, watchedMovie: WatchedMovie): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.watchedMovie = watchedMovie;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
