import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviePageComponent, MovieListComponent, MovieDetailsPageComponent } from './components';
import { AuthGuardService } from '../core';

const routes: Routes = [
  {
    path: '',
    component: MoviePageComponent,
    children: [
      {
        path: '',
        redirectTo: 'popular',
        pathMatch: 'full'
      },
      {
        path: 'popular',
        component: MovieListComponent,
        data: {
          category: 'popular'
        }
      },
      {
        path: 'top-rated',
        component: MovieListComponent,
        data: {
          category: 'top-rated'
        }
      },
      {
        path: 'bookmarked',
        component: MovieListComponent,
        canActivate: [AuthGuardService],
        data: {
          category: 'bookmarked'
        }
      },
      {
        path: 'watched',
        component: MovieListComponent,
        canActivate: [AuthGuardService],
        data: {
          category: 'watched'
        }
      },
      {
        path: 'rated',
        component: MovieListComponent,
        canActivate: [AuthGuardService],
        data: {
          category: 'rated'
        }
      }
    ]
  },
  {
    path: ':id',
    component: MovieDetailsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
