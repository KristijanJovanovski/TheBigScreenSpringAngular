/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TheBigScreenTestModule } from '../../../test.module';
import { TmdbImageDialogComponent } from '../../../../../../main/webapp/app/entities/tmdb-image/tmdb-image-dialog.component';
import { TmdbImageService } from '../../../../../../main/webapp/app/entities/tmdb-image/tmdb-image.service';
import { TmdbImage } from '../../../../../../main/webapp/app/entities/tmdb-image/tmdb-image.model';
import { MovieService } from '../../../../../../main/webapp/app/entities/movie';
import { PeopleService } from '../../../../../../main/webapp/app/entities/people';

describe('Component Tests', () => {

    describe('TmdbImage Management Dialog Component', () => {
        let comp: TmdbImageDialogComponent;
        let fixture: ComponentFixture<TmdbImageDialogComponent>;
        let service: TmdbImageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [TmdbImageDialogComponent],
                providers: [
                    MovieService,
                    PeopleService,
                    TmdbImageService
                ]
            })
            .overrideTemplate(TmdbImageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TmdbImageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TmdbImageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TmdbImage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.tmdbImage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tmdbImageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TmdbImage();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.tmdbImage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tmdbImageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
