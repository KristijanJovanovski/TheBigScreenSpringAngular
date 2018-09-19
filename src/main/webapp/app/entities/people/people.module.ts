import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TheBigScreenSharedModule } from '../../shared';
import {
    PeopleService,
    PeoplePopupService,
    PeopleComponent,
    PeopleDetailComponent,
    PeopleDialogComponent,
    PeoplePopupComponent,
    PeopleDeletePopupComponent,
    PeopleDeleteDialogComponent,
    peopleRoute,
    peoplePopupRoute,
} from './';

const ENTITY_STATES = [
    ...peopleRoute,
    ...peoplePopupRoute,
];

@NgModule({
    imports: [
        TheBigScreenSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PeopleComponent,
        PeopleDetailComponent,
        PeopleDialogComponent,
        PeopleDeleteDialogComponent,
        PeoplePopupComponent,
        PeopleDeletePopupComponent,
    ],
    entryComponents: [
        PeopleComponent,
        PeopleDialogComponent,
        PeoplePopupComponent,
        PeopleDeleteDialogComponent,
        PeopleDeletePopupComponent,
    ],
    providers: [
        PeopleService,
        PeoplePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TheBigScreenPeopleModule {}
