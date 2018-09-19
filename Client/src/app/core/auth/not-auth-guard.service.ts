import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthSelectors } from './auth.selectors';

@Injectable()
export class NotAuthGuardService implements CanActivate, CanLoad {
    isAuthenticated = false;

    constructor(private store: Store<any>) {
        this.store.select(AuthSelectors.selectIsAuthenticated)
            .subscribe(auth => (this.isAuthenticated = auth));
    }
    canActivate(): boolean {
        return !this.isAuthenticated;
    }
    canLoad(): boolean {
        return !this.isAuthenticated;
    }
}
