/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TheBigScreenTestModule } from '../../../test.module';
import { RatedMovieDialogComponent } from '../../../../../../main/webapp/app/entities/rated-movie/rated-movie-dialog.component';
import { RatedMovieService } from '../../../../../../main/webapp/app/entities/rated-movie/rated-movie.service';
import { RatedMovie } from '../../../../../../main/webapp/app/entities/rated-movie/rated-movie.model';
import { MovieService } from '../../../../../../main/webapp/app/entities/movie';
import { ProfileService } from '../../../../../../main/webapp/app/entities/profile';

describe('Component Tests', () => {

    describe('RatedMovie Management Dialog Component', () => {
        let comp: RatedMovieDialogComponent;
        let fixture: ComponentFixture<RatedMovieDialogComponent>;
        let service: RatedMovieService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [RatedMovieDialogComponent],
                providers: [
                    MovieService,
                    ProfileService,
                    RatedMovieService
                ]
            })
            .overrideTemplate(RatedMovieDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RatedMovieDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RatedMovieService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RatedMovie(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.ratedMovie = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ratedMovieListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RatedMovie();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.ratedMovie = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ratedMovieListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
