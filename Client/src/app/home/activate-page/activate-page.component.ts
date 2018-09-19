import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthState, AuthSelectors, ActivateAction, ClearMessagesAction } from '../../core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { takeWhile, filter, switchMap, map, take, first } from 'rxjs/operators';

@Component({
  selector: 'tbs-activate-page',
  templateUrl: './activate-page.component.html',
  styleUrls: ['./activate-page.component.scss']
})
export class ActivatePageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public error$: Observable<string>;
  public loading$: Observable<boolean>;
  public activatedSuccessMessage$: Observable<string>;
  public activated$: Observable<string>;
  alive = true;
  routerSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AuthState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routerSubscription = this.route.paramMap.pipe(
      map((queryParamMap: ParamMap) => {
        const key = queryParamMap.get('key');
        if (!!key) {
          return this.store.dispatch(new ActivateAction(key));
        }
        return queryParamMap;
      }),
      first()
    ).subscribe();

    this.form = this.formBuilder.group({
      activationKey: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(20)]],
    });
    this.error$ = this.store.select(AuthSelectors.selectAuthError);
    this.activatedSuccessMessage$ = this.store.select(AuthSelectors.selectAuthActivatedMessage);
    this.activated$ = this.store.select(AuthSelectors.selectAuthActivated);
    this.loading$ = this.store.select(AuthSelectors.selectAuthLoading);
    this.store.select(AuthSelectors.selectIsAuthenticated)
      .pipe(
        takeWhile(() => this.alive),
        filter(authenticated => authenticated)
      ).subscribe(val => this.router.navigateByUrl('/login'));
  }

  ngOnDestroy() {
    this.alive = false;
    if (this.routerSubscription != null) { this.routerSubscription.unsubscribe(); }
    this.store.dispatch(new ClearMessagesAction({ type: '' }));
  }

  submit() {
    const payload: string = this.form.get('activationKey').value;
    this.store.dispatch(new ActivateAction(payload));
  }

}
