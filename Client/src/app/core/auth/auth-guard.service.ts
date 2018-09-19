import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthSelectors } from './auth.selectors';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
  isAuthenticated = false;

  constructor(private store: Store<any>) {
    this.store.select(AuthSelectors.selectIsAuthenticated)
      .subscribe(auth => (this.isAuthenticated = auth));
  }
  canActivate(): boolean {
    // if (!this.isAuthenticated) {
    //   this.router.navigateByUrl('/login');
    // }
    return this.isAuthenticated;
  }
  canLoad(): boolean {
    // if (!this.isAuthenticated) {
    //   this.router.navigateByUrl('/login');
    // }
    return this.isAuthenticated;
  }
}
