/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TheBigScreenTestModule } from '../../../test.module';
import { KeywordDetailComponent } from '../../../../../../main/webapp/app/entities/keyword/keyword-detail.component';
import { KeywordService } from '../../../../../../main/webapp/app/entities/keyword/keyword.service';
import { Keyword } from '../../../../../../main/webapp/app/entities/keyword/keyword.model';

describe('Component Tests', () => {

    describe('Keyword Management Detail Component', () => {
        let comp: KeywordDetailComponent;
        let fixture: ComponentFixture<KeywordDetailComponent>;
        let service: KeywordService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [KeywordDetailComponent],
                providers: [
                    KeywordService
                ]
            })
            .overrideTemplate(KeywordDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KeywordDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeywordService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Keyword(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.keyword).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
