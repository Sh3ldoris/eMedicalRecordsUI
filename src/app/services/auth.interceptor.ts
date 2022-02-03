import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if ((err.status === 401 || err.status === 403) && this.authService.isLogIn()) {
      this.authService.logOut();
      //this.router.navigate(['/']);
      return of(err.message);
    }
    return throwError(err);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isLogIn()) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.getToken()
        }
      });
    }

    return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
  }
}
