/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TheBigScreenTestModule } from '../../../test.module';
import { BookmarkedMovieDetailComponent } from '../../../../../../main/webapp/app/entities/bookmarked-movie/bookmarked-movie-detail.component';
import { BookmarkedMovieService } from '../../../../../../main/webapp/app/entities/bookmarked-movie/bookmarked-movie.service';
import { BookmarkedMovie } from '../../../../../../main/webapp/app/entities/bookmarked-movie/bookmarked-movie.model';

describe('Component Tests', () => {

    describe('BookmarkedMovie Management Detail Component', () => {
        let comp: BookmarkedMovieDetailComponent;
        let fixture: ComponentFixture<BookmarkedMovieDetailComponent>;
        let service: BookmarkedMovieService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [BookmarkedMovieDetailComponent],
                providers: [
                    BookmarkedMovieService
                ]
            })
            .overrideTemplate(BookmarkedMovieDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookmarkedMovieDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookmarkedMovieService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BookmarkedMovie(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bookmarkedMovie).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
