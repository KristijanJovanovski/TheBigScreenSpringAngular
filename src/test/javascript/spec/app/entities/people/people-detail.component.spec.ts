/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TheBigScreenTestModule } from '../../../test.module';
import { PeopleDetailComponent } from '../../../../../../main/webapp/app/entities/people/people-detail.component';
import { PeopleService } from '../../../../../../main/webapp/app/entities/people/people.service';
import { People } from '../../../../../../main/webapp/app/entities/people/people.model';

describe('Component Tests', () => {

    describe('People Management Detail Component', () => {
        let comp: PeopleDetailComponent;
        let fixture: ComponentFixture<PeopleDetailComponent>;
        let service: PeopleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [PeopleDetailComponent],
                providers: [
                    PeopleService
                ]
            })
            .overrideTemplate(PeopleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PeopleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PeopleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new People(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.people).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
