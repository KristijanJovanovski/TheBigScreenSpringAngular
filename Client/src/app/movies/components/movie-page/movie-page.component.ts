import { Component, OnInit, OnDestroy } from '@angular/core';
import { routeAnimations } from '@app/core';
import { Store } from '@ngrx/store';
import { AuthState, AuthSelectors } from '../../../core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'tbs-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
  animations: [routeAnimations]
})
export class MoviePageComponent implements OnInit, OnDestroy {
  alive = true;
  isAuthenticated: boolean;
  constructor(
    private store: Store<AuthState>
  ) { }

  ngOnInit() {
    this.store.select(AuthSelectors.selectIsAuthenticated)
      .pipe(
        takeWhile(() => this.alive),
    ).subscribe(val => this.isAuthenticated = val);
  }
  ngOnDestroy(): void {
    this.alive = false;
  }
}
