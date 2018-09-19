/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TheBigScreenTestModule } from '../../../test.module';
import { TmdbImageDetailComponent } from '../../../../../../main/webapp/app/entities/tmdb-image/tmdb-image-detail.component';
import { TmdbImageService } from '../../../../../../main/webapp/app/entities/tmdb-image/tmdb-image.service';
import { TmdbImage } from '../../../../../../main/webapp/app/entities/tmdb-image/tmdb-image.model';

describe('Component Tests', () => {

    describe('TmdbImage Management Detail Component', () => {
        let comp: TmdbImageDetailComponent;
        let fixture: ComponentFixture<TmdbImageDetailComponent>;
        let service: TmdbImageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [TmdbImageDetailComponent],
                providers: [
                    TmdbImageService
                ]
            })
            .overrideTemplate(TmdbImageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TmdbImageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TmdbImageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TmdbImage(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tmdbImage).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
