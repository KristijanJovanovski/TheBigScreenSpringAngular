/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TheBigScreenTestModule } from '../../../test.module';
import { PeopleComponent } from '../../../../../../main/webapp/app/entities/people/people.component';
import { PeopleService } from '../../../../../../main/webapp/app/entities/people/people.service';
import { People } from '../../../../../../main/webapp/app/entities/people/people.model';

describe('Component Tests', () => {

    describe('People Management Component', () => {
        let comp: PeopleComponent;
        let fixture: ComponentFixture<PeopleComponent>;
        let service: PeopleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [PeopleComponent],
                providers: [
                    PeopleService
                ]
            })
            .overrideTemplate(PeopleComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PeopleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PeopleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new People(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.people[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
