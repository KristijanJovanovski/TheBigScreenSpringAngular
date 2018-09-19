import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TheBigScreenSharedModule } from '../../shared';
import {
    MovieCrewService,
    MovieCrewPopupService,
    MovieCrewComponent,
    MovieCrewDetailComponent,
    MovieCrewDialogComponent,
    MovieCrewPopupComponent,
    MovieCrewDeletePopupComponent,
    MovieCrewDeleteDialogComponent,
    movieCrewRoute,
    movieCrewPopupRoute,
} from './';

const ENTITY_STATES = [
    ...movieCrewRoute,
    ...movieCrewPopupRoute,
];

@NgModule({
    imports: [
        TheBigScreenSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MovieCrewComponent,
        MovieCrewDetailComponent,
        MovieCrewDialogComponent,
        MovieCrewDeleteDialogComponent,
        MovieCrewPopupComponent,
        MovieCrewDeletePopupComponent,
    ],
    entryComponents: [
        MovieCrewComponent,
        MovieCrewDialogComponent,
        MovieCrewPopupComponent,
        MovieCrewDeleteDialogComponent,
        MovieCrewDeletePopupComponent,
    ],
    providers: [
        MovieCrewService,
        MovieCrewPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TheBigScreenMovieCrewModule {}
