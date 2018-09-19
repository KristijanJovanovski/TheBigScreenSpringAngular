import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TheBigScreenSharedModule } from '../../shared';
import {
    RatedMovieService,
    RatedMoviePopupService,
    RatedMovieComponent,
    RatedMovieDetailComponent,
    RatedMovieDialogComponent,
    RatedMoviePopupComponent,
    RatedMovieDeletePopupComponent,
    RatedMovieDeleteDialogComponent,
    ratedMovieRoute,
    ratedMoviePopupRoute,
} from './';

const ENTITY_STATES = [
    ...ratedMovieRoute,
    ...ratedMoviePopupRoute,
];

@NgModule({
    imports: [
        TheBigScreenSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RatedMovieComponent,
        RatedMovieDetailComponent,
        RatedMovieDialogComponent,
        RatedMovieDeleteDialogComponent,
        RatedMoviePopupComponent,
        RatedMovieDeletePopupComponent,
    ],
    entryComponents: [
        RatedMovieComponent,
        RatedMovieDialogComponent,
        RatedMoviePopupComponent,
        RatedMovieDeleteDialogComponent,
        RatedMovieDeletePopupComponent,
    ],
    providers: [
        RatedMovieService,
        RatedMoviePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TheBigScreenRatedMovieModule {}
