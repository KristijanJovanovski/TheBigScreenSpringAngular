import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthState, AuthSelectors, SignUpAction, ClearMessagesAction } from '../../core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { takeWhile, filter } from 'rxjs/operators';
import { UserSignUpModel } from '../../core/auth/user-sign-up.model';

@Component({
  selector: 'tbs-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public error$: Observable<string>;
  public loading$: Observable<boolean>;
  alive = true;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AuthState>,
    private router: Router
  ) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(35)]],
    });

    this.error$ = this.store.select(AuthSelectors.selectAuthError);
    this.loading$ = this.store.select(AuthSelectors.selectAuthLoading);
    this.store.select(AuthSelectors.selectIsAuthenticated)
      .pipe(
        takeWhile(() => this.alive),
        filter(authenticated => authenticated)
      ).subscribe(val => this.router.navigateByUrl('/activate'));
  }
  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new ClearMessagesAction({ type: 'error' }));
  }
  home() {
    this.router.navigateByUrl('/');
  }
  signIn() {
    this.router.navigateByUrl('/login');
  }
  submit() {
    const login: string = this.form.get('login').value;
    const email: string = this.form.get('email').value;
    const password: string = this.form.get('password').value;

    login.trim();
    email.trim();
    password.trim();

    const payload = { login, email, password } as UserSignUpModel;
    this.store.dispatch(new SignUpAction(payload));
  }

}
