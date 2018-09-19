/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TheBigScreenTestModule } from '../../../test.module';
import { BookmarkedMovieDialogComponent } from '../../../../../../main/webapp/app/entities/bookmarked-movie/bookmarked-movie-dialog.component';
import { BookmarkedMovieService } from '../../../../../../main/webapp/app/entities/bookmarked-movie/bookmarked-movie.service';
import { BookmarkedMovie } from '../../../../../../main/webapp/app/entities/bookmarked-movie/bookmarked-movie.model';
import { MovieService } from '../../../../../../main/webapp/app/entities/movie';
import { ProfileService } from '../../../../../../main/webapp/app/entities/profile';

describe('Component Tests', () => {

    describe('BookmarkedMovie Management Dialog Component', () => {
        let comp: BookmarkedMovieDialogComponent;
        let fixture: ComponentFixture<BookmarkedMovieDialogComponent>;
        let service: BookmarkedMovieService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [BookmarkedMovieDialogComponent],
                providers: [
                    MovieService,
                    ProfileService,
                    BookmarkedMovieService
                ]
            })
            .overrideTemplate(BookmarkedMovieDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookmarkedMovieDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookmarkedMovieService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BookmarkedMovie(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.bookmarkedMovie = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bookmarkedMovieListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BookmarkedMovie();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.bookmarkedMovie = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bookmarkedMovieListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
