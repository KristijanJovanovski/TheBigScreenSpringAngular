/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TheBigScreenTestModule } from '../../../test.module';
import { GenreDetailComponent } from '../../../../../../main/webapp/app/entities/genre/genre-detail.component';
import { GenreService } from '../../../../../../main/webapp/app/entities/genre/genre.service';
import { Genre } from '../../../../../../main/webapp/app/entities/genre/genre.model';

describe('Component Tests', () => {

    describe('Genre Management Detail Component', () => {
        let comp: GenreDetailComponent;
        let fixture: ComponentFixture<GenreDetailComponent>;
        let service: GenreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [GenreDetailComponent],
                providers: [
                    GenreService
                ]
            })
            .overrideTemplate(GenreDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GenreDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GenreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Genre(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.genre).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
