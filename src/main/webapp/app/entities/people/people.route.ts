import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PeopleComponent } from './people.component';
import { PeopleDetailComponent } from './people-detail.component';
import { PeoplePopupComponent } from './people-dialog.component';
import { PeopleDeletePopupComponent } from './people-delete-dialog.component';

export const peopleRoute: Routes = [
    {
        path: 'people',
        component: PeopleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'people/:id',
        component: PeopleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const peoplePopupRoute: Routes = [
    {
        path: 'people-new',
        component: PeoplePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'people/:id/edit',
        component: PeoplePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'people/:id/delete',
        component: PeopleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
