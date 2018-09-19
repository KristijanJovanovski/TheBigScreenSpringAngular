/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TheBigScreenTestModule } from '../../../test.module';
import { WatchedMovieDetailComponent } from '../../../../../../main/webapp/app/entities/watched-movie/watched-movie-detail.component';
import { WatchedMovieService } from '../../../../../../main/webapp/app/entities/watched-movie/watched-movie.service';
import { WatchedMovie } from '../../../../../../main/webapp/app/entities/watched-movie/watched-movie.model';

describe('Component Tests', () => {

    describe('WatchedMovie Management Detail Component', () => {
        let comp: WatchedMovieDetailComponent;
        let fixture: ComponentFixture<WatchedMovieDetailComponent>;
        let service: WatchedMovieService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [WatchedMovieDetailComponent],
                providers: [
                    WatchedMovieService
                ]
            })
            .overrideTemplate(WatchedMovieDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WatchedMovieDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WatchedMovieService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new WatchedMovie(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.watchedMovie).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
