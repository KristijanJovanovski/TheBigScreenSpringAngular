import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TheBigScreenSharedModule } from '../../shared';
import {
    GenreService,
    GenrePopupService,
    GenreComponent,
    GenreDetailComponent,
    GenreDialogComponent,
    GenrePopupComponent,
    GenreDeletePopupComponent,
    GenreDeleteDialogComponent,
    genreRoute,
    genrePopupRoute,
} from './';

const ENTITY_STATES = [
    ...genreRoute,
    ...genrePopupRoute,
];

@NgModule({
    imports: [
        TheBigScreenSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GenreComponent,
        GenreDetailComponent,
        GenreDialogComponent,
        GenreDeleteDialogComponent,
        GenrePopupComponent,
        GenreDeletePopupComponent,
    ],
    entryComponents: [
        GenreComponent,
        GenreDialogComponent,
        GenrePopupComponent,
        GenreDeleteDialogComponent,
        GenreDeletePopupComponent,
    ],
    providers: [
        GenreService,
        GenrePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TheBigScreenGenreModule {}
