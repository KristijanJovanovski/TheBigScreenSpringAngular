/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TheBigScreenTestModule } from '../../../test.module';
import { RatedMovieComponent } from '../../../../../../main/webapp/app/entities/rated-movie/rated-movie.component';
import { RatedMovieService } from '../../../../../../main/webapp/app/entities/rated-movie/rated-movie.service';
import { RatedMovie } from '../../../../../../main/webapp/app/entities/rated-movie/rated-movie.model';

describe('Component Tests', () => {

    describe('RatedMovie Management Component', () => {
        let comp: RatedMovieComponent;
        let fixture: ComponentFixture<RatedMovieComponent>;
        let service: RatedMovieService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [RatedMovieComponent],
                providers: [
                    RatedMovieService
                ]
            })
            .overrideTemplate(RatedMovieComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RatedMovieComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RatedMovieService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RatedMovie(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ratedMovies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
