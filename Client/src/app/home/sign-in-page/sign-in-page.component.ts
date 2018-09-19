import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState, AuthSelectors, LogInAction, ClearMessagesAction } from '../../core';
import { Observable } from 'rxjs';
import { takeWhile, filter } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSignInModel } from '../../core/auth/user-sign-in.model';

@Component({
  selector: 'tbs-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public error$: Observable<string>;
  public loading$: Observable<boolean>;
  alive = true;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AuthState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(35)]],
      rememberMe: new FormControl(false),
    });

    this.error$ = this.store.select(AuthSelectors.selectAuthError);
    this.loading$ = this.store.select(AuthSelectors.selectAuthLoading);
    this.store.select(AuthSelectors.selectIsAuthenticated)
      .pipe(
        takeWhile(() => this.alive),
        filter(authenticated => authenticated)
      ).subscribe(val => this.router.navigateByUrl('/movies'));
  }
  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new ClearMessagesAction({ type: 'error' }));
  }
  home() {
    this.router.navigateByUrl('/');
  }
  signUp() {
    this.router.navigateByUrl('/register');
  }
  submit() {
    const username: string = this.form.get('username').value;
    const password: string = this.form.get('password').value;
    const rememberMe: boolean = this.form.get('rememberMe').value;

    username.trim();
    password.trim();

    const payload = { username, password, rememberMe } as UserSignInModel;
    this.store.dispatch(new LogInAction(payload));
  }

}
