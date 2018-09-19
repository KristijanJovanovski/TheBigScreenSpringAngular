import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MovieComponent } from './movie.component';
import { MovieDetailComponent } from './movie-detail.component';
import { MoviePopupComponent } from './movie-dialog.component';
import { MovieDeletePopupComponent } from './movie-delete-dialog.component';

export const movieRoute: Routes = [
    {
        path: 'movie',
        component: MovieComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Movies'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'movie/:id',
        component: MovieDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Movies'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const moviePopupRoute: Routes = [
    {
        path: 'movie-new',
        component: MoviePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Movies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'movie/:id/edit',
        component: MoviePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Movies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'movie/:id/delete',
        component: MovieDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Movies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
