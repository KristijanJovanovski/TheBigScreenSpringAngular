/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TheBigScreenTestModule } from '../../../test.module';
import { BookmarkedMovieDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/bookmarked-movie/bookmarked-movie-delete-dialog.component';
import { BookmarkedMovieService } from '../../../../../../main/webapp/app/entities/bookmarked-movie/bookmarked-movie.service';

describe('Component Tests', () => {

    describe('BookmarkedMovie Management Delete Component', () => {
        let comp: BookmarkedMovieDeleteDialogComponent;
        let fixture: ComponentFixture<BookmarkedMovieDeleteDialogComponent>;
        let service: BookmarkedMovieService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [BookmarkedMovieDeleteDialogComponent],
                providers: [
                    BookmarkedMovieService
                ]
            })
            .overrideTemplate(BookmarkedMovieDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookmarkedMovieDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookmarkedMovieService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
