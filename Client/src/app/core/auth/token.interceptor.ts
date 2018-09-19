import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injector, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private auth: AuthService;
    constructor(
        // private localStorageAndSessionService: LocalAndSessionStorageService
        private injector: Injector
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.auth = this.injector.get(AuthService);
        const token: string = this.auth.getToken();
        request = request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return next.handle(request);
    }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError((response: any) => {
                if (response instanceof HttpErrorResponse && response.status === 401 &&
                    response.error['path'] !== '/api/authenticate') {
                    localStorage.removeItem('token');
                    sessionStorage.removeItem('token');
                    this.router.navigate(['/login']);
                    // navigateByUrl('/login');
                }
                if (response instanceof HttpErrorResponse && response.status === 404) {
                    this.router.navigateByUrl('/error');
                }
                console.log(`Http error:`);
                console.log(response.error);
                return throwError(response);
            })
        );
    }
}
