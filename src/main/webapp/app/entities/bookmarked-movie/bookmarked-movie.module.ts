import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TheBigScreenSharedModule } from '../../shared';
import {
    BookmarkedMovieService,
    BookmarkedMoviePopupService,
    BookmarkedMovieComponent,
    BookmarkedMovieDetailComponent,
    BookmarkedMovieDialogComponent,
    BookmarkedMoviePopupComponent,
    BookmarkedMovieDeletePopupComponent,
    BookmarkedMovieDeleteDialogComponent,
    bookmarkedMovieRoute,
    bookmarkedMoviePopupRoute,
} from './';

const ENTITY_STATES = [
    ...bookmarkedMovieRoute,
    ...bookmarkedMoviePopupRoute,
];

@NgModule({
    imports: [
        TheBigScreenSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BookmarkedMovieComponent,
        BookmarkedMovieDetailComponent,
        BookmarkedMovieDialogComponent,
        BookmarkedMovieDeleteDialogComponent,
        BookmarkedMoviePopupComponent,
        BookmarkedMovieDeletePopupComponent,
    ],
    entryComponents: [
        BookmarkedMovieComponent,
        BookmarkedMovieDialogComponent,
        BookmarkedMoviePopupComponent,
        BookmarkedMovieDeleteDialogComponent,
        BookmarkedMovieDeletePopupComponent,
    ],
    providers: [
        BookmarkedMovieService,
        BookmarkedMoviePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TheBigScreenBookmarkedMovieModule {}
