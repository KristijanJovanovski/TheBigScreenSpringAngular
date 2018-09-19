import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

import {
  AuthActionTypes, LogInAction, LogInSuccessAction,
  LogInFailureAction, SignUpAction, SignUpSuccessAction,
  SignUpFailureAction,
  ActivateAction,
  ActivateSuccessAction,
  ActivateFailureAction,
  FetchCurrentUserAction,
  FetchCurrentUserSuccessAction,
  FetchCurrentUserFailureAction
} from './auth.actions';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<Action>,
    private router: Router,
    private authService: AuthService
  ) { }

  @Effect()
  logIn: Observable<any> = this.actions$
    .ofType(AuthActionTypes.LOGIN).pipe(
      map((action: LogInAction) => action.payload),
      switchMap(payload => {
        return this.authService.logIn(payload.username, payload.password, payload.rememberMe)
          .pipe(
            map((jwt) => new LogInSuccessAction({
              login: payload.username,
              rememberMe: payload.rememberMe,
              token: jwt
            })),
            catchError((response) =>
              of(new LogInFailureAction({ error: { title: response.error['title'], detail: response.error['detail'] } }))
            )
          );
      })
    );

  @Effect()
  logInSuccess: Observable<any> = this.actions$
    .ofType(AuthActionTypes.LOGIN_SUCCESS).pipe(
      switchMap((action: LogInSuccessAction) => {
        if (action.payload.rememberMe) {
          sessionStorage.setItem('token', action.payload.token);
        } else {
          localStorage.setItem('token', action.payload.token);
        }
        return of(new FetchCurrentUserAction(action.payload.token));
        // this.router.navigateByUrl('/');
      })
    );

  @Effect({ dispatch: false })
  logInFailure: Observable<any> = this.actions$
    .ofType(AuthActionTypes.LOGIN_FAILURE);

  @Effect()
  fetchCurrentUser: Observable<any> = this.actions$
    .ofType(AuthActionTypes.FETCH_CURRENT_USER).pipe(
      map((action: FetchCurrentUserAction) => action.payload),
      switchMap((payload: string) => this.authService.getUserByToken(payload).pipe(
        map((response: User) => new FetchCurrentUserSuccessAction(response)),
        catchError((response) => of(new FetchCurrentUserFailureAction({
          error: {
            title: response.error['title'],
          }
        }
        ))
        )
      ))
    );

  @Effect({ dispatch: false })
  fetchCurrentUserSuccess: Observable<any> = this.actions$
    .ofType(AuthActionTypes.FETCH_CURRENT_USER).pipe(
      tap(() => this.router.navigateByUrl('/'))
    );

  @Effect({ dispatch: false })
  fetchCurrentUserFailure: Observable<any> = this.actions$
    .ofType(AuthActionTypes.FETCH_CURRENT_USER);

  @Effect()
  signUp: Observable<any> = this.actions$
    .ofType(AuthActionTypes.SIGNUP).pipe(
      map((action: SignUpAction) => action.payload),
      switchMap(payload => {
        return this.authService.signUp(payload.login, payload.email, payload.password)
          .pipe(
            map(() => {
              return new SignUpSuccessAction();
            }),
            catchError((response) =>
              of(new SignUpFailureAction({ error: { title: response.error['title'], detail: response.error['detail'] } }))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  signUpSuccess: Observable<any> = this.actions$
    .ofType(AuthActionTypes.SIGNUP_SUCCESS)
    .pipe(
      tap(() => {
        this.router.navigateByUrl('/activate');
      })
    );

  @Effect({ dispatch: false })
  signUpFailure: Observable<any> = this.actions$
    .ofType(AuthActionTypes.SIGNUP_FAILURE);

  @Effect()
  activate: Observable<any> = this.actions$
    .ofType(AuthActionTypes.ACTIVATE).pipe(
      map((action: ActivateAction) => action.payload),
      switchMap(payload => {
        return this.authService.activate(payload)
          .pipe(
            map((message) => {
              return new ActivateSuccessAction(message);
            }),
            catchError((response) =>
              of(new ActivateFailureAction({
                error: {
                  title: response.error['title'],
                  //  detail: response.error['detail']
                }
              }))
            ));
      })
    );

  @Effect({ dispatch: false })
  activateSuccess: Observable<any> = this.actions$
    .ofType(AuthActionTypes.ACTIVATE_SUCCESS);


  @Effect({ dispatch: false })
  activateFailure: Observable<any> = this.actions$
    .ofType(AuthActionTypes.ACTIVATE_FAILURE);


  @Effect({ dispatch: false })
  logOut: Observable<any> = this.actions$
    .ofType(AuthActionTypes.LOGOUT)
    .pipe(
      tap(() => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        this.router.navigateByUrl('/');
      })
    );

}
