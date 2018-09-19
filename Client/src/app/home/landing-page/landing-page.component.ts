import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthSelectors, AuthState } from '../../core';
import { Store } from '@ngrx/store';
import { takeWhile, filter } from 'rxjs/operators';

@Component({
  selector: 'tbs-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {
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
