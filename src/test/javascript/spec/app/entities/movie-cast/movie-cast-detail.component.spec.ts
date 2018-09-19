/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TheBigScreenTestModule } from '../../../test.module';
import { MovieCastDetailComponent } from '../../../../../../main/webapp/app/entities/movie-cast/movie-cast-detail.component';
import { MovieCastService } from '../../../../../../main/webapp/app/entities/movie-cast/movie-cast.service';
import { MovieCast } from '../../../../../../main/webapp/app/entities/movie-cast/movie-cast.model';

describe('Component Tests', () => {

    describe('MovieCast Management Detail Component', () => {
        let comp: MovieCastDetailComponent;
        let fixture: ComponentFixture<MovieCastDetailComponent>;
        let service: MovieCastService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [MovieCastDetailComponent],
                providers: [
                    MovieCastService
                ]
            })
            .overrideTemplate(MovieCastDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MovieCastDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovieCastService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MovieCast(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.movieCast).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
