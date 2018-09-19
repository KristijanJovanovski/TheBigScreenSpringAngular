import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TheBigScreenSharedModule } from '../../shared';
import {
    KeywordService,
    KeywordPopupService,
    KeywordComponent,
    KeywordDetailComponent,
    KeywordDialogComponent,
    KeywordPopupComponent,
    KeywordDeletePopupComponent,
    KeywordDeleteDialogComponent,
    keywordRoute,
    keywordPopupRoute,
} from './';

const ENTITY_STATES = [
    ...keywordRoute,
    ...keywordPopupRoute,
];

@NgModule({
    imports: [
        TheBigScreenSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        KeywordComponent,
        KeywordDetailComponent,
        KeywordDialogComponent,
        KeywordDeleteDialogComponent,
        KeywordPopupComponent,
        KeywordDeletePopupComponent,
    ],
    entryComponents: [
        KeywordComponent,
        KeywordDialogComponent,
        KeywordPopupComponent,
        KeywordDeleteDialogComponent,
        KeywordDeletePopupComponent,
    ],
    providers: [
        KeywordService,
        KeywordPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TheBigScreenKeywordModule {}
