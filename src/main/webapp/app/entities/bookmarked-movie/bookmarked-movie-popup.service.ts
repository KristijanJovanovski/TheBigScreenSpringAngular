import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BookmarkedMovie } from './bookmarked-movie.model';
import { BookmarkedMovieService } from './bookmarked-movie.service';

@Injectable()
export class BookmarkedMoviePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private bookmarkedMovieService: BookmarkedMovieService

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
                this.bookmarkedMovieService.find(id)
                    .subscribe((bookmarkedMovieResponse: HttpResponse<BookmarkedMovie>) => {
                        const bookmarkedMovie: BookmarkedMovie = bookmarkedMovieResponse.body;
                        bookmarkedMovie.createdOn = this.datePipe
                            .transform(bookmarkedMovie.createdOn, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.bookmarkedMovieModalRef(component, bookmarkedMovie);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.bookmarkedMovieModalRef(component, new BookmarkedMovie());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    bookmarkedMovieModalRef(component: Component, bookmarkedMovie: BookmarkedMovie): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bookmarkedMovie = bookmarkedMovie;
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
