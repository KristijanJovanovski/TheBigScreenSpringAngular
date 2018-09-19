import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TheBigScreenSharedModule } from '../../shared';
import {
    MovieCastService,
    MovieCastPopupService,
    MovieCastComponent,
    MovieCastDetailComponent,
    MovieCastDialogComponent,
    MovieCastPopupComponent,
    MovieCastDeletePopupComponent,
    MovieCastDeleteDialogComponent,
    movieCastRoute,
    movieCastPopupRoute,
} from './';

const ENTITY_STATES = [
    ...movieCastRoute,
    ...movieCastPopupRoute,
];

@NgModule({
    imports: [
        TheBigScreenSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MovieCastComponent,
        MovieCastDetailComponent,
        MovieCastDialogComponent,
        MovieCastDeleteDialogComponent,
        MovieCastPopupComponent,
        MovieCastDeletePopupComponent,
    ],
    entryComponents: [
        MovieCastComponent,
        MovieCastDialogComponent,
        MovieCastPopupComponent,
        MovieCastDeleteDialogComponent,
        MovieCastDeletePopupComponent,
    ],
    providers: [
        MovieCastService,
        MovieCastPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TheBigScreenMovieCastModule {}
