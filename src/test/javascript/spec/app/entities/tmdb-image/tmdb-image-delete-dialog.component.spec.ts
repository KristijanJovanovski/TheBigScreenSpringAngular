/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TheBigScreenTestModule } from '../../../test.module';
import { TmdbImageDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tmdb-image/tmdb-image-delete-dialog.component';
import { TmdbImageService } from '../../../../../../main/webapp/app/entities/tmdb-image/tmdb-image.service';

describe('Component Tests', () => {

    describe('TmdbImage Management Delete Component', () => {
        let comp: TmdbImageDeleteDialogComponent;
        let fixture: ComponentFixture<TmdbImageDeleteDialogComponent>;
        let service: TmdbImageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [TmdbImageDeleteDialogComponent],
                providers: [
                    TmdbImageService
                ]
            })
            .overrideTemplate(TmdbImageDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TmdbImageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TmdbImageService);
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
