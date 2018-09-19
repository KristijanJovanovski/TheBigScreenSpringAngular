/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TheBigScreenTestModule } from '../../../test.module';
import { MovieCrewDetailComponent } from '../../../../../../main/webapp/app/entities/movie-crew/movie-crew-detail.component';
import { MovieCrewService } from '../../../../../../main/webapp/app/entities/movie-crew/movie-crew.service';
import { MovieCrew } from '../../../../../../main/webapp/app/entities/movie-crew/movie-crew.model';

describe('Component Tests', () => {

    describe('MovieCrew Management Detail Component', () => {
        let comp: MovieCrewDetailComponent;
        let fixture: ComponentFixture<MovieCrewDetailComponent>;
        let service: MovieCrewService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [MovieCrewDetailComponent],
                providers: [
                    MovieCrewService
                ]
            })
            .overrideTemplate(MovieCrewDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MovieCrewDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovieCrewService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MovieCrew(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.movieCrew).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
