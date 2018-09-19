import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { RatedMovie } from './rated-movie.model';
import { RatedMovieService } from './rated-movie.service';

@Injectable()
export class RatedMoviePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private ratedMovieService: RatedMovieService

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
                this.ratedMovieService.find(id)
                    .subscribe((ratedMovieResponse: HttpResponse<RatedMovie>) => {
                        const ratedMovie: RatedMovie = ratedMovieResponse.body;
                        ratedMovie.createdOn = this.datePipe
                            .transform(ratedMovie.createdOn, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.ratedMovieModalRef(component, ratedMovie);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.ratedMovieModalRef(component, new RatedMovie());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ratedMovieModalRef(component: Component, ratedMovie: RatedMovie): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ratedMovie = ratedMovie;
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
