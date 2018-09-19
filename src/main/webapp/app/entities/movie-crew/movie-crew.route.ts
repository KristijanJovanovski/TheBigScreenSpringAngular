import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MovieCrewComponent } from './movie-crew.component';
import { MovieCrewDetailComponent } from './movie-crew-detail.component';
import { MovieCrewPopupComponent } from './movie-crew-dialog.component';
import { MovieCrewDeletePopupComponent } from './movie-crew-delete-dialog.component';

export const movieCrewRoute: Routes = [
    {
        path: 'movie-crew',
        component: MovieCrewComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovieCrews'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'movie-crew/:id',
        component: MovieCrewDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovieCrews'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const movieCrewPopupRoute: Routes = [
    {
        path: 'movie-crew-new',
        component: MovieCrewPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovieCrews'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'movie-crew/:id/edit',
        component: MovieCrewPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovieCrews'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'movie-crew/:id/delete',
        component: MovieCrewDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovieCrews'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
