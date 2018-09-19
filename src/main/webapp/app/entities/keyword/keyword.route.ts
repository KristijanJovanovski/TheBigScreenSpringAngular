import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { KeywordComponent } from './keyword.component';
import { KeywordDetailComponent } from './keyword-detail.component';
import { KeywordPopupComponent } from './keyword-dialog.component';
import { KeywordDeletePopupComponent } from './keyword-delete-dialog.component';

export const keywordRoute: Routes = [
    {
        path: 'keyword',
        component: KeywordComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Keywords'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'keyword/:id',
        component: KeywordDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Keywords'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const keywordPopupRoute: Routes = [
    {
        path: 'keyword-new',
        component: KeywordPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Keywords'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'keyword/:id/edit',
        component: KeywordPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Keywords'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'keyword/:id/delete',
        component: KeywordDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Keywords'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
