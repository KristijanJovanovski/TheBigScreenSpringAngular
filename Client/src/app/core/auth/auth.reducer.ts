import { Action, createFeatureSelector } from '@ngrx/store';
import { AuthActionsUnion, AuthActionTypes } from './auth.actions';
import { User } from './user.model';

interface AuthError {
  title?: string;
  details?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user?: User;
  error?: AuthError;
  loading: boolean;
  activatedMessage?: string;
  activated?: boolean;
  rememberMe?: boolean;
  token?: string;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
  error: undefined,
  loading: false,
  activatedMessage: undefined,
  activated: undefined,
  rememberMe: undefined,
  token: undefined
};


export function authReducer(state: AuthState = initialState, action: AuthActionsUnion): AuthState {
  switch (action.type) {

    case AuthActionTypes.LOGIN:
      return {
        ...state, error: undefined,
        rememberMe: action.payload.rememberMe, loading: true
      };

    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state, isAuthenticated: true,
        rememberMe: action.payload.rememberMe,
        token: action.payload.token,
        user: undefined,
        error: undefined,
        loading: false
      };

    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state, error: {
          title: action.payload.error.title,
          details: action.payload.error.detail
        },
        token: undefined,
        loading: false,
        user: undefined
      };
    case AuthActionTypes.FETCH_CURRENT_USER:
      return { ...state, error: undefined, loading: true };

    case AuthActionTypes.FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state, isAuthenticated: true,
        user: action.payload,
        error: undefined,
        loading: false
      };

    case AuthActionTypes.FETCH_CURRENT_USER_FAILURE:
      return {
        ...state, error: {
          title: action.payload.error.title,
          details: action.payload.error.detail
        },
        loading: false,
        user: undefined
      };

    case AuthActionTypes.SIGNUP:
      return { ...state, error: undefined, loading: true };

    // TODO: fix this user should activate first
    case AuthActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        user: null,
        error: null,
        loading: false
      };
    // TODO: error message from server maybe in payload maybe?
    case AuthActionTypes.SIGNUP_FAILURE:
      return {
        ...state, error: {
          title: action.payload.error.title,
          details: action.payload.error.detail
        },
        loading: false,
        user: undefined
      };

    case AuthActionTypes.ACTIVATE:
      return { ...state, activated: undefined, activatedMessage: undefined, error: undefined, loading: true };

    case AuthActionTypes.ACTIVATE_SUCCESS:
      return {
        ...state,
        activatedMessage: action.payload.message,
        activated: true,
        error: undefined,
        loading: false
      };
    // TODO: error message should come from the server
    case AuthActionTypes.ACTIVATE_FAILURE:
      return {
        ...state, error: {
          title: action.payload.error.title,
          // details: action.payload.error.detail
        },
        loading: false,
        // questionable mutation of user ? maybe shouldn't set it to null and let it be
        user: undefined
      };

    case AuthActionTypes.CLEAR_MESSAGES:
      return action.payload.type === 'error' ? { ...state, error: undefined } :
        action.payload.type === 'success' ? { ...state, activated: undefined, activatedMessage: undefined } :
          { ...state, error: undefined, activated: undefined, activatedMessage: undefined };

    case AuthActionTypes.LOGOUT:
      return initialState;

    default:
      return state;
  }
}

export const getAuthState = createFeatureSelector('auth');

export const getIsAuthenticated = state => state.isAuthenticated;
export const getAuthError = state => state.error;
export const getAuthLoading = state => state.loading;
export const getAuthUser = state => state.user;
export const getAuthActivatedMessage = state => state.activatedMessage;
export const getAuthActivated = state => state.activated;

// export const initialState: AuthState = {
//   isAuthenticated: false,
//   user: null,
//   errorMessage: null,
//   loading: false
// };
