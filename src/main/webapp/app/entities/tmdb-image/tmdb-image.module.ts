import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TheBigScreenSharedModule } from '../../shared';
import {
    TmdbImageService,
    TmdbImagePopupService,
    TmdbImageComponent,
    TmdbImageDetailComponent,
    TmdbImageDialogComponent,
    TmdbImagePopupComponent,
    TmdbImageDeletePopupComponent,
    TmdbImageDeleteDialogComponent,
    tmdbImageRoute,
    tmdbImagePopupRoute,
} from './';

const ENTITY_STATES = [
    ...tmdbImageRoute,
    ...tmdbImagePopupRoute,
];

@NgModule({
    imports: [
        TheBigScreenSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TmdbImageComponent,
        TmdbImageDetailComponent,
        TmdbImageDialogComponent,
        TmdbImageDeleteDialogComponent,
        TmdbImagePopupComponent,
        TmdbImageDeletePopupComponent,
    ],
    entryComponents: [
        TmdbImageComponent,
        TmdbImageDialogComponent,
        TmdbImagePopupComponent,
        TmdbImageDeleteDialogComponent,
        TmdbImageDeletePopupComponent,
    ],
    providers: [
        TmdbImageService,
        TmdbImagePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TheBigScreenTmdbImageModule {}
