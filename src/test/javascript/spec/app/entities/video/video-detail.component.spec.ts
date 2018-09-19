/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TheBigScreenTestModule } from '../../../test.module';
import { VideoDetailComponent } from '../../../../../../main/webapp/app/entities/video/video-detail.component';
import { VideoService } from '../../../../../../main/webapp/app/entities/video/video.service';
import { Video } from '../../../../../../main/webapp/app/entities/video/video.model';

describe('Component Tests', () => {

    describe('Video Management Detail Component', () => {
        let comp: VideoDetailComponent;
        let fixture: ComponentFixture<VideoDetailComponent>;
        let service: VideoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TheBigScreenTestModule],
                declarations: [VideoDetailComponent],
                providers: [
                    VideoService
                ]
            })
            .overrideTemplate(VideoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VideoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VideoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Video(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.video).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
