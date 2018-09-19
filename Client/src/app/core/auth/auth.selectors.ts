import {
    getAuthState, getIsAuthenticated, getAuthLoading,
    getAuthError, getAuthUser, getAuthActivatedMessage, getAuthActivated
} from './auth.reducer';
import { createSelector } from '@ngrx/store';

export namespace AuthSelectors {
    export const selectIsAuthenticated = createSelector(
        getAuthState,
        getIsAuthenticated
    );
    export const selectAuthLoading = createSelector(
        getAuthState,
        getAuthLoading
    );
    export const selectAuthError = createSelector(
        getAuthState,
        getAuthError
    );
    export const selectAuthUser = createSelector(
        getAuthState,
        getAuthUser
    );
    export const selectAuthActivatedMessage = createSelector(
        getAuthState,
        getAuthActivatedMessage
    );
    export const selectAuthActivated = createSelector(
        getAuthState,
        getAuthActivated
    );
}
