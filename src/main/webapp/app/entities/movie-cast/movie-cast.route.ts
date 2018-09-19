import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MovieCastComponent } from './movie-cast.component';
import { MovieCastDetailComponent } from './movie-cast-detail.component';
import { MovieCastPopupComponent } from './movie-cast-dialog.component';
import { MovieCastDeletePopupComponent } from './movie-cast-delete-dialog.component';

export const movieCastRoute: Routes = [
    {
        path: 'movie-cast',
        component: MovieCastComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovieCasts'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'movie-cast/:id',
        component: MovieCastDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovieCasts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const movieCastPopupRoute: Routes = [
    {
        path: 'movie-cast-new',
        component: MovieCastPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovieCasts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'movie-cast/:id/edit',
        component: MovieCastPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovieCasts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'movie-cast/:id/delete',
        component: MovieCastDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovieCasts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
