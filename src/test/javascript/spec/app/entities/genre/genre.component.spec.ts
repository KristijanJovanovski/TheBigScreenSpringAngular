/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TheBigScreenTestModule } from '../../../test.module';
import { GenreComponent } from '../../../../../../main/webapp/app/entities/genre/genre.component';
import { GenreService } from '../../../../../../main/webapp/app/entities/genre/genre.service';
import { Genre } from '../../../../../../main/webapp/app/entities/genre/genre.model';

describe('Component Tests', () => {

    describe('Genre Management Component', () => {
        let comp: GenreComponent;
        let fixture: ComponentFixture<GenreComponent>;
        let service: GenreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [GenreComponent],
                providers: [
                    GenreService
                ]
            })
            .overrideTemplate(GenreComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GenreComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GenreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Genre(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.genres[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
