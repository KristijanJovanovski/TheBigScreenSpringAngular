import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings';

import {
  SignUpPageComponent, SignInPageComponent,
  LandingPageComponent, ErrorPageComponent,
  ActivatePageComponent
} from './home';
import { AuthGuardService } from './core';
import { NotAuthGuardService } from './core/auth/not-auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'login',
    canActivate: [NotAuthGuardService],
    component: SignInPageComponent
  },
  {
    path: 'register',
    canActivate: [NotAuthGuardService],
    component: SignUpPageComponent
  },
  {
    path: 'activate',
    canActivate: [NotAuthGuardService],
    component: ActivatePageComponent
  },
  {
    path: 'activate/:key',
    canActivate: [NotAuthGuardService],
    component: ActivatePageComponent
  },
  {
    path: 'movies',
    loadChildren: './movies/movies.module#MoviesModule'
  },
  {
    path: 'people',
    loadChildren: './people/people.module#PeopleModule'
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Settings'
    }
  },
  {
    path: 'examples',
    loadChildren: 'app/examples/examples.module#ExamplesModule'
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
