import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { SERVER_API_URL } from '../../constants';
import { User } from './user.model';
import { UserSignInModel } from './user-sign-in.model';
import { Observable, of } from 'rxjs';
import { UserSignUpModel } from './user-sign-up.model';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

    getToken(): string {
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    }

    getUserByToken(token?: string): Observable<User> {
        const url = `${SERVER_API_URL}account`;
        return this.http.get<User>(url);
    }

    logIn(login: string, password: string, rememberMe: boolean): Observable<any> {
        const url = `${SERVER_API_URL}authenticate`;
        const user = { username: login, password, rememberMe } as UserSignInModel;
        return this.http.post(url, user, { observe: 'response' }).pipe(
            map((response: HttpResponse<any>) => {
                const bearerToken: string = response.headers.get('Authorization');
                if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                    const jwt = bearerToken.slice(7, bearerToken.length);
                    return jwt;
                }
            })
        );
    }

    signUp(login: string, email: string, password: string): Observable<User> {
        const url = `${SERVER_API_URL}register`;
        const user = { login, email, password } as UserSignUpModel;
        return this.http.post<User>(url, user);
    }

    activate(activationKey: string): Observable<string> {
        const url = `${SERVER_API_URL}activate/?key=${activationKey}`;
        return this.http.get<string>(url);
    }

    getStatus(): Observable<string> {
        const url = `${SERVER_API_URL}authenticate`;
        return this.http.get<string>(url);
    }
}
