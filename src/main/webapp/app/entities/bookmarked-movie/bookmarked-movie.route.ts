import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BookmarkedMovieComponent } from './bookmarked-movie.component';
import { BookmarkedMovieDetailComponent } from './bookmarked-movie-detail.component';
import { BookmarkedMoviePopupComponent } from './bookmarked-movie-dialog.component';
import { BookmarkedMovieDeletePopupComponent } from './bookmarked-movie-delete-dialog.component';

export const bookmarkedMovieRoute: Routes = [
    {
        path: 'bookmarked-movie',
        component: BookmarkedMovieComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BookmarkedMovies'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bookmarked-movie/:id',
        component: BookmarkedMovieDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BookmarkedMovies'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bookmarkedMoviePopupRoute: Routes = [
    {
        path: 'bookmarked-movie-new',
        component: BookmarkedMoviePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BookmarkedMovies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bookmarked-movie/:id/edit',
        component: BookmarkedMoviePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BookmarkedMovies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bookmarked-movie/:id/delete',
        component: BookmarkedMovieDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BookmarkedMovies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
