/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TheBigScreenTestModule } from '../../../test.module';
import { TmdbImageComponent } from '../../../../../../main/webapp/app/entities/tmdb-image/tmdb-image.component';
import { TmdbImageService } from '../../../../../../main/webapp/app/entities/tmdb-image/tmdb-image.service';
import { TmdbImage } from '../../../../../../main/webapp/app/entities/tmdb-image/tmdb-image.model';

describe('Component Tests', () => {

    describe('TmdbImage Management Component', () => {
        let comp: TmdbImageComponent;
        let fixture: ComponentFixture<TmdbImageComponent>;
        let service: TmdbImageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [TmdbImageComponent],
                providers: [
                    TmdbImageService
                ]
            })
            .overrideTemplate(TmdbImageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TmdbImageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TmdbImageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TmdbImage(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tmdbImages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
