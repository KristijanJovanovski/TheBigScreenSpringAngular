import browser from 'browser-detect';
import { Title } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivationEnd, Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import {
  AnimationsService,
  routeAnimations,
  LogOutAction,
  AuthSelectors,
  FetchCurrentUserAction
} from './core';
import { environment as env } from '@env/environment';

import {
  NIGHT_MODE_THEME,
  selectorSettings,
  SettingsState,
  ActionSettingsChangeAnimationsPageDisabled
} from './settings';
import { User } from './core/auth/user.model';
import { MatSidenavContainer } from '@angular/material/sidenav';

@Component({
  selector: 'tbs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;
  @HostBinding('class') componentCssClass;

  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');
  navigation = [
    { link: 'movies', label: 'Movies' },
    { link: 'people', label: 'People' },
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'Settings' }
  ];
  isAuthenticated;
  user$: Observable<User>;

  constructor(
    public overlayContainer: OverlayContainer,
    private store: Store<any>,
    private router: Router,
    private titleService: Title,
    private animationService: AnimationsService
  ) { }

  private static trackPageView(event: NavigationEnd) {
    (<any>window).ga('set', 'page', event.urlAfterRedirects);
    (<any>window).ga('send', 'pageview');
  }

  private static isIEorEdge() {
    return ['ie', 'edge'].includes(browser().name);
  }

  ngOnInit(): void {
    this.subscribeToSettings();
    this.subscribeToIsAuthenticated();
  }

  ngAfterViewInit() {
    this.sidenavContainer.scrollable.elementScrolled().subscribe(() =>
      console.log('scrolled')
    );
    this.subscribeToRouterEvents();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onLoginClick() {
    // this.store.dispatch(new ActionAuthLogin());
    this.router.navigateByUrl('/login');
  }

  onLogoutClick() {
    this.store.dispatch(new LogOutAction());
  }

  private subscribeToIsAuthenticated() {
    const token = sessionStorage.getItem('token');
    if (token) { this.store.dispatch(new FetchCurrentUserAction(token)); }
    this.store.select(AuthSelectors.selectIsAuthenticated)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(auth => (this.isAuthenticated = auth));
    this.user$ = this.store.select(AuthSelectors.selectAuthUser)
      .pipe(takeUntil(this.unsubscribe$));
  }

  private subscribeToSettings() {
    if (AppComponent.isIEorEdge()) {
      this.store.dispatch(
        new ActionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }
    this.store
      .select(selectorSettings)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(settings => {
        this.setTheme(settings);
        this.animationService.updateRouteAnimationType(
          settings.pageAnimations,
          settings.elementsAnimations
        );
      });
  }

  private setTheme(settings: SettingsState) {
    const { theme, autoNightMode } = settings;
    const hours = new Date().getHours();
    const effectiveTheme = (autoNightMode && (hours >= 20 || hours <= 6)
      ? NIGHT_MODE_THEME
      : theme
    ).toLowerCase();
    this.componentCssClass = effectiveTheme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(effectiveTheme);
  }

  private subscribeToRouterEvents() {
    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof ActivationEnd || event instanceof NavigationEnd
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(event => {
        if (event instanceof ActivationEnd) {
          this.setPageTitle(event);
        }

        if (event instanceof NavigationEnd) {
          AppComponent.trackPageView(event);
        }
      });
  }

  private setPageTitle(event: ActivationEnd) {
    let lastChild = event.snapshot;
    while (lastChild.children.length) {
      lastChild = lastChild.children[0];
    }
    const { title } = lastChild.data;
    this.titleService.setTitle(
      title ? `${title} - ${env.appName}` : env.appName
    );
  }
}
