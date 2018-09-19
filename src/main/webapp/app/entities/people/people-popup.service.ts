import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { People } from './people.model';
import { PeopleService } from './people.service';

@Injectable()
export class PeoplePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private peopleService: PeopleService

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
                this.peopleService.find(id)
                    .subscribe((peopleResponse: HttpResponse<People>) => {
                        const people: People = peopleResponse.body;
                        people.birthday = this.datePipe
                            .transform(people.birthday, 'yyyy-MM-ddTHH:mm:ss');
                        people.deathday = this.datePipe
                            .transform(people.deathday, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.peopleModalRef(component, people);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.peopleModalRef(component, new People());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    peopleModalRef(component: Component, people: People): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.people = people;
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
