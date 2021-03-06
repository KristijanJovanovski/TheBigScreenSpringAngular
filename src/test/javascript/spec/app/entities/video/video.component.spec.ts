/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TheBigScreenTestModule } from '../../../test.module';
import { VideoComponent } from '../../../../../../main/webapp/app/entities/video/video.component';
import { VideoService } from '../../../../../../main/webapp/app/entities/video/video.service';
import { Video } from '../../../../../../main/webapp/app/entities/video/video.model';

describe('Component Tests', () => {

    describe('Video Management Component', () => {
        let comp: VideoComponent;
        let fixture: ComponentFixture<VideoComponent>;
        let service: VideoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [VideoComponent],
                providers: [
                    VideoService
                ]
            })
            .overrideTemplate(VideoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VideoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VideoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Video(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.videos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
