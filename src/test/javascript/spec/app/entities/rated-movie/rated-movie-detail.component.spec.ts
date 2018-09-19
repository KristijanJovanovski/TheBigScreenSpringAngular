/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TheBigScreenTestModule } from '../../../test.module';
import { RatedMovieDetailComponent } from '../../../../../../main/webapp/app/entities/rated-movie/rated-movie-detail.component';
import { RatedMovieService } from '../../../../../../main/webapp/app/entities/rated-movie/rated-movie.service';
import { RatedMovie } from '../../../../../../main/webapp/app/entities/rated-movie/rated-movie.model';

describe('Component Tests', () => {

    describe('RatedMovie Management Detail Component', () => {
        let comp: RatedMovieDetailComponent;
        let fixture: ComponentFixture<RatedMovieDetailComponent>;
        let service: RatedMovieService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [RatedMovieDetailComponent],
                providers: [
                    RatedMovieService
                ]
            })
            .overrideTemplate(RatedMovieDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RatedMovieDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RatedMovieService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RatedMovie(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ratedMovie).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
