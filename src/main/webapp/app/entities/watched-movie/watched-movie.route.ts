import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { WatchedMovieComponent } from './watched-movie.component';
import { WatchedMovieDetailComponent } from './watched-movie-detail.component';
import { WatchedMoviePopupComponent } from './watched-movie-dialog.component';
import { WatchedMovieDeletePopupComponent } from './watched-movie-delete-dialog.component';

export const watchedMovieRoute: Routes = [
    {
        path: 'watched-movie',
        component: WatchedMovieComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WatchedMovies'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'watched-movie/:id',
        component: WatchedMovieDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WatchedMovies'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const watchedMoviePopupRoute: Routes = [
    {
        path: 'watched-movie-new',
        component: WatchedMoviePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WatchedMovies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'watched-movie/:id/edit',
        component: WatchedMoviePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WatchedMovies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'watched-movie/:id/delete',
        component: WatchedMovieDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WatchedMovies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
