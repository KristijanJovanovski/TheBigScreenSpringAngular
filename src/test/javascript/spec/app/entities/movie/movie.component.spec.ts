/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TheBigScreenTestModule } from '../../../test.module';
import { MovieComponent } from '../../../../../../main/webapp/app/entities/movie/movie.component';
import { MovieService } from '../../../../../../main/webapp/app/entities/movie/movie.service';
import { Movie } from '../../../../../../main/webapp/app/entities/movie/movie.model';

describe('Component Tests', () => {

    describe('Movie Management Component', () => {
        let comp: MovieComponent;
        let fixture: ComponentFixture<MovieComponent>;
        let service: MovieService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [MovieComponent],
                providers: [
                    MovieService
                ]
            })
            .overrideTemplate(MovieComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MovieComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovieService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Movie(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.movies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
