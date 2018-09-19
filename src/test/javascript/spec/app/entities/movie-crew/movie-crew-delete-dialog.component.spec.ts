/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TheBigScreenTestModule } from '../../../test.module';
import { MovieCrewDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/movie-crew/movie-crew-delete-dialog.component';
import { MovieCrewService } from '../../../../../../main/webapp/app/entities/movie-crew/movie-crew.service';

describe('Component Tests', () => {

    describe('MovieCrew Management Delete Component', () => {
        let comp: MovieCrewDeleteDialogComponent;
        let fixture: ComponentFixture<MovieCrewDeleteDialogComponent>;
        let service: MovieCrewService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [MovieCrewDeleteDialogComponent],
                providers: [
                    MovieCrewService
                ]
            })
            .overrideTemplate(MovieCrewDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MovieCrewDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovieCrewService);
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
