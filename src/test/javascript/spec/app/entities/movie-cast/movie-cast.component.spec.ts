/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TheBigScreenTestModule } from '../../../test.module';
import { MovieCastComponent } from '../../../../../../main/webapp/app/entities/movie-cast/movie-cast.component';
import { MovieCastService } from '../../../../../../main/webapp/app/entities/movie-cast/movie-cast.service';
import { MovieCast } from '../../../../../../main/webapp/app/entities/movie-cast/movie-cast.model';

describe('Component Tests', () => {

    describe('MovieCast Management Component', () => {
        let comp: MovieCastComponent;
        let fixture: ComponentFixture<MovieCastComponent>;
        let service: MovieCastService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [MovieCastComponent],
                providers: [
                    MovieCastService
                ]
            })
            .overrideTemplate(MovieCastComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MovieCastComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovieCastService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MovieCast(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.movieCasts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
