import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { GenreComponent } from './genre.component';
import { GenreDetailComponent } from './genre-detail.component';
import { GenrePopupComponent } from './genre-dialog.component';
import { GenreDeletePopupComponent } from './genre-delete-dialog.component';

export const genreRoute: Routes = [
    {
        path: 'genre',
        component: GenreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genres'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'genre/:id',
        component: GenreDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genres'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const genrePopupRoute: Routes = [
    {
        path: 'genre-new',
        component: GenrePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genres'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'genre/:id/edit',
        component: GenrePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genres'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'genre/:id/delete',
        component: GenreDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genres'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
