/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TheBigScreenTestModule } from '../../../test.module';
import { WatchedMovieComponent } from '../../../../../../main/webapp/app/entities/watched-movie/watched-movie.component';
import { WatchedMovieService } from '../../../../../../main/webapp/app/entities/watched-movie/watched-movie.service';
import { WatchedMovie } from '../../../../../../main/webapp/app/entities/watched-movie/watched-movie.model';

describe('Component Tests', () => {

    describe('WatchedMovie Management Component', () => {
        let comp: WatchedMovieComponent;
        let fixture: ComponentFixture<WatchedMovieComponent>;
        let service: WatchedMovieService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [WatchedMovieComponent],
                providers: [
                    WatchedMovieService
                ]
            })
            .overrideTemplate(WatchedMovieComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WatchedMovieComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WatchedMovieService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new WatchedMovie(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.watchedMovies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
