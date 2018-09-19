import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TheBigScreenSharedModule } from '../../shared';
import {
    MovieService,
    MoviePopupService,
    MovieComponent,
    MovieDetailComponent,
    MovieDialogComponent,
    MoviePopupComponent,
    MovieDeletePopupComponent,
    MovieDeleteDialogComponent,
    movieRoute,
    moviePopupRoute,
} from './';

const ENTITY_STATES = [
    ...movieRoute,
    ...moviePopupRoute,
];

@NgModule({
    imports: [
        TheBigScreenSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MovieComponent,
        MovieDetailComponent,
        MovieDialogComponent,
        MovieDeleteDialogComponent,
        MoviePopupComponent,
        MovieDeletePopupComponent,
    ],
    entryComponents: [
        MovieComponent,
        MovieDialogComponent,
        MoviePopupComponent,
        MovieDeleteDialogComponent,
        MovieDeletePopupComponent,
    ],
    providers: [
        MovieService,
        MoviePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TheBigScreenMovieModule {}
