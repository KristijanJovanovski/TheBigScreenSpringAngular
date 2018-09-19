import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { MovieCrew } from './movie-crew.model';
import { MovieCrewService } from './movie-crew.service';

@Injectable()
export class MovieCrewPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private movieCrewService: MovieCrewService

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
                this.movieCrewService.find(id)
                    .subscribe((movieCrewResponse: HttpResponse<MovieCrew>) => {
                        const movieCrew: MovieCrew = movieCrewResponse.body;
                        this.ngbModalRef = this.movieCrewModalRef(component, movieCrew);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.movieCrewModalRef(component, new MovieCrew());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    movieCrewModalRef(component: Component, movieCrew: MovieCrew): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.movieCrew = movieCrew;
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
