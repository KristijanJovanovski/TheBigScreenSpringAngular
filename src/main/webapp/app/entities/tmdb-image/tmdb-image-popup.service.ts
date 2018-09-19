import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TmdbImage } from './tmdb-image.model';
import { TmdbImageService } from './tmdb-image.service';

@Injectable()
export class TmdbImagePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tmdbImageService: TmdbImageService

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
                this.tmdbImageService.find(id)
                    .subscribe((tmdbImageResponse: HttpResponse<TmdbImage>) => {
                        const tmdbImage: TmdbImage = tmdbImageResponse.body;
                        this.ngbModalRef = this.tmdbImageModalRef(component, tmdbImage);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tmdbImageModalRef(component, new TmdbImage());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tmdbImageModalRef(component: Component, tmdbImage: TmdbImage): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tmdbImage = tmdbImage;
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
