/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TheBigScreenTestModule } from '../../../test.module';
import { BookmarkedMovieComponent } from '../../../../../../main/webapp/app/entities/bookmarked-movie/bookmarked-movie.component';
import { BookmarkedMovieService } from '../../../../../../main/webapp/app/entities/bookmarked-movie/bookmarked-movie.service';
import { BookmarkedMovie } from '../../../../../../main/webapp/app/entities/bookmarked-movie/bookmarked-movie.model';

describe('Component Tests', () => {

    describe('BookmarkedMovie Management Component', () => {
        let comp: BookmarkedMovieComponent;
        let fixture: ComponentFixture<BookmarkedMovieComponent>;
        let service: BookmarkedMovieService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [BookmarkedMovieComponent],
                providers: [
                    BookmarkedMovieService
                ]
            })
            .overrideTemplate(BookmarkedMovieComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookmarkedMovieComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookmarkedMovieService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BookmarkedMovie(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bookmarkedMovies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
