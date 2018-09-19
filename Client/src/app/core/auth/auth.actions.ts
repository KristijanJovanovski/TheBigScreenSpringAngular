import { Action } from '@ngrx/store';
import { UserSignInModel } from './user-sign-in.model';
import { UserSignUpModel } from './user-sign-up.model';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILURE = '[Auth] Login Failure',
    SIGNUP = '[Auth] Signup',
    SIGNUP_SUCCESS = '[Auth] Signup Success',
    SIGNUP_FAILURE = '[Auth] Signup Failure',
    ACTIVATE = '[Auth] Activate',
    ACTIVATE_SUCCESS = '[Auth] Activate Success',
    ACTIVATE_FAILURE = '[Auth] Activate Failure',
    FETCH_CURRENT_USER = '[Auth] Fetch Current User',
    FETCH_CURRENT_USER_SUCCESS = '[Auth] Fetch Current User Success',
    FETCH_CURRENT_USER_FAILURE = '[Auth] Fetch Current User Failure',
    CLEAR_MESSAGES = '[Auth] Clear messages',
    LOGOUT = '[Auth] Logout',

    // GET_STATUS = '[Auth] GetStatus'
}

export class LogInAction implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: UserSignInModel) { }
}

export class LogInSuccessAction implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any) { }
}

export class LogInFailureAction implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE;
    constructor(public payload: any) { }
}

export class SignUpAction implements Action {
    readonly type = AuthActionTypes.SIGNUP;
    constructor(public payload: UserSignUpModel) { }
}

export class SignUpSuccessAction implements Action {
    readonly type = AuthActionTypes.SIGNUP_SUCCESS;
    // constructor(public payload: any) { }
}

export class SignUpFailureAction implements Action {
    readonly type = AuthActionTypes.SIGNUP_FAILURE;
    constructor(public payload: any) { }
}

export class ActivateAction implements Action {
    readonly type = AuthActionTypes.ACTIVATE;
    constructor(public payload: any) { }
}

export class ActivateSuccessAction implements Action {
    readonly type = AuthActionTypes.ACTIVATE_SUCCESS;
    constructor(public payload: any) { }
}

export class ActivateFailureAction implements Action {
    readonly type = AuthActionTypes.ACTIVATE_FAILURE;
    constructor(public payload: any) { }
}

export class FetchCurrentUserAction implements Action {
    readonly type = AuthActionTypes.FETCH_CURRENT_USER;
    constructor(public payload: any) { }
}

export class FetchCurrentUserSuccessAction implements Action {
    readonly type = AuthActionTypes.FETCH_CURRENT_USER_SUCCESS;
    constructor(public payload: any) { }
}

export class FetchCurrentUserFailureAction implements Action {
    readonly type = AuthActionTypes.FETCH_CURRENT_USER_FAILURE;
    constructor(public payload: any) { }
}
export class ClearMessagesAction implements Action {
    readonly type = AuthActionTypes.CLEAR_MESSAGES;
    constructor(public payload: any) { }
}

export class LogOutAction implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}
// export class GetStatusAction implements Action {
//     readonly type = AuthActionTypes.GET_STATUS;
// }

export type AuthActionsUnion =
    | LogInAction
    | LogInSuccessAction
    | LogInFailureAction
    | SignUpAction
    | SignUpSuccessAction
    | SignUpFailureAction
    | ActivateAction
    | ActivateSuccessAction
    | ActivateFailureAction
    | FetchCurrentUserAction
    | FetchCurrentUserSuccessAction
    | FetchCurrentUserFailureAction
    | ClearMessagesAction
    | LogOutAction;
    // | GetStatusAction;
