/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TheBigScreenTestModule } from '../../../test.module';
import { MovieCrewDialogComponent } from '../../../../../../main/webapp/app/entities/movie-crew/movie-crew-dialog.component';
import { MovieCrewService } from '../../../../../../main/webapp/app/entities/movie-crew/movie-crew.service';
import { MovieCrew } from '../../../../../../main/webapp/app/entities/movie-crew/movie-crew.model';
import { MovieService } from '../../../../../../main/webapp/app/entities/movie';
import { PeopleService } from '../../../../../../main/webapp/app/entities/people';

describe('Component Tests', () => {

    describe('MovieCrew Management Dialog Component', () => {
        let comp: MovieCrewDialogComponent;
        let fixture: ComponentFixture<MovieCrewDialogComponent>;
        let service: MovieCrewService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [MovieCrewDialogComponent],
                providers: [
                    MovieService,
                    PeopleService,
                    MovieCrewService
                ]
            })
            .overrideTemplate(MovieCrewDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MovieCrewDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovieCrewService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MovieCrew(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.movieCrew = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'movieCrewListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MovieCrew();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.movieCrew = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'movieCrewListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
