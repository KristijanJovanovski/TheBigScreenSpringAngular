import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TmdbImageComponent } from './tmdb-image.component';
import { TmdbImageDetailComponent } from './tmdb-image-detail.component';
import { TmdbImagePopupComponent } from './tmdb-image-dialog.component';
import { TmdbImageDeletePopupComponent } from './tmdb-image-delete-dialog.component';

export const tmdbImageRoute: Routes = [
    {
        path: 'tmdb-image',
        component: TmdbImageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TmdbImages'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tmdb-image/:id',
        component: TmdbImageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TmdbImages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tmdbImagePopupRoute: Routes = [
    {
        path: 'tmdb-image-new',
        component: TmdbImagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TmdbImages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tmdb-image/:id/edit',
        component: TmdbImagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TmdbImages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tmdb-image/:id/delete',
        component: TmdbImageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TmdbImages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
