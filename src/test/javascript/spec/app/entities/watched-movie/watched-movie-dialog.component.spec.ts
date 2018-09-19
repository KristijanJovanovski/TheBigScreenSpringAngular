/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TheBigScreenTestModule } from '../../../test.module';
import { WatchedMovieDialogComponent } from '../../../../../../main/webapp/app/entities/watched-movie/watched-movie-dialog.component';
import { WatchedMovieService } from '../../../../../../main/webapp/app/entities/watched-movie/watched-movie.service';
import { WatchedMovie } from '../../../../../../main/webapp/app/entities/watched-movie/watched-movie.model';
import { MovieService } from '../../../../../../main/webapp/app/entities/movie';
import { ProfileService } from '../../../../../../main/webapp/app/entities/profile';

describe('Component Tests', () => {

    describe('WatchedMovie Management Dialog Component', () => {
        let comp: WatchedMovieDialogComponent;
        let fixture: ComponentFixture<WatchedMovieDialogComponent>;
        let service: WatchedMovieService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [WatchedMovieDialogComponent],
                providers: [
                    MovieService,
                    ProfileService,
                    WatchedMovieService
                ]
            })
            .overrideTemplate(WatchedMovieDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WatchedMovieDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WatchedMovieService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WatchedMovie(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.watchedMovie = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'watchedMovieListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WatchedMovie();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.watchedMovie = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'watchedMovieListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
