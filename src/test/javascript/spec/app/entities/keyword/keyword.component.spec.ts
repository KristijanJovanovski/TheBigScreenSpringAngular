/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TheBigScreenTestModule } from '../../../test.module';
import { KeywordComponent } from '../../../../../../main/webapp/app/entities/keyword/keyword.component';
import { KeywordService } from '../../../../../../main/webapp/app/entities/keyword/keyword.service';
import { Keyword } from '../../../../../../main/webapp/app/entities/keyword/keyword.model';

describe('Component Tests', () => {

    describe('Keyword Management Component', () => {
        let comp: KeywordComponent;
        let fixture: ComponentFixture<KeywordComponent>;
        let service: KeywordService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [KeywordComponent],
                providers: [
                    KeywordService
                ]
            })
            .overrideTemplate(KeywordComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KeywordComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeywordService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Keyword(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.keywords[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
