import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private userService: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler,): Observable<HttpEvent<unknown>> {
    const clone = request.clone();

    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403 || error.status === 401) {
          if (this.userService.loggedIn()) {
            console.log('Refreshing User Access Token');
            this.userService.refreshUser().subscribe(
              val => {
                console.log(val);
                if (val.accessToken !== undefined) {
                  this.userService.addUser(this.userService.user, val.accessToken, this.userService.refreshToken);
                }
              },
              err => {
                localStorage.removeItem('user');
              }
            );
          }
        }
        return throwError(error);
      })
    );
  }
}
