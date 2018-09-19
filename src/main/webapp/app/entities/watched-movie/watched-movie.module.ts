import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TheBigScreenSharedModule } from '../../shared';
import {
    WatchedMovieService,
    WatchedMoviePopupService,
    WatchedMovieComponent,
    WatchedMovieDetailComponent,
    WatchedMovieDialogComponent,
    WatchedMoviePopupComponent,
    WatchedMovieDeletePopupComponent,
    WatchedMovieDeleteDialogComponent,
    watchedMovieRoute,
    watchedMoviePopupRoute,
} from './';

const ENTITY_STATES = [
    ...watchedMovieRoute,
    ...watchedMoviePopupRoute,
];

@NgModule({
    imports: [
        TheBigScreenSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WatchedMovieComponent,
        WatchedMovieDetailComponent,
        WatchedMovieDialogComponent,
        WatchedMovieDeleteDialogComponent,
        WatchedMoviePopupComponent,
        WatchedMovieDeletePopupComponent,
    ],
    entryComponents: [
        WatchedMovieComponent,
        WatchedMovieDialogComponent,
        WatchedMoviePopupComponent,
        WatchedMovieDeleteDialogComponent,
        WatchedMovieDeletePopupComponent,
    ],
    providers: [
        WatchedMovieService,
        WatchedMoviePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TheBigScreenWatchedMovieModule {}
