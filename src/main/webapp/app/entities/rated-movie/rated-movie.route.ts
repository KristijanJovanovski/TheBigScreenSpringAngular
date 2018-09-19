import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RatedMovieComponent } from './rated-movie.component';
import { RatedMovieDetailComponent } from './rated-movie-detail.component';
import { RatedMoviePopupComponent } from './rated-movie-dialog.component';
import { RatedMovieDeletePopupComponent } from './rated-movie-delete-dialog.component';

export const ratedMovieRoute: Routes = [
    {
        path: 'rated-movie',
        component: RatedMovieComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RatedMovies'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rated-movie/:id',
        component: RatedMovieDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RatedMovies'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ratedMoviePopupRoute: Routes = [
    {
        path: 'rated-movie-new',
        component: RatedMoviePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RatedMovies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rated-movie/:id/edit',
        component: RatedMoviePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RatedMovies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rated-movie/:id/delete',
        component: RatedMovieDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RatedMovies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
