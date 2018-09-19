/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TheBigScreenTestModule } from '../../../test.module';
import { MovieCrewComponent } from '../../../../../../main/webapp/app/entities/movie-crew/movie-crew.component';
import { MovieCrewService } from '../../../../../../main/webapp/app/entities/movie-crew/movie-crew.service';
import { MovieCrew } from '../../../../../../main/webapp/app/entities/movie-crew/movie-crew.model';

describe('Component Tests', () => {

    describe('MovieCrew Management Component', () => {
        let comp: MovieCrewComponent;
        let fixture: ComponentFixture<MovieCrewComponent>;
        let service: MovieCrewService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [MovieCrewComponent],
                providers: [
                    MovieCrewService
                ]
            })
            .overrideTemplate(MovieCrewComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MovieCrewComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovieCrewService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MovieCrew(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.movieCrews[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
