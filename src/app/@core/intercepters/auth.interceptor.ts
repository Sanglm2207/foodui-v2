import { HTTP_INTERCEPTORS, HttpEvent, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { TokenService } from '../services/_service/auth/token.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const lang = localStorage.getItem('lang') || 'vi';
    const token = this.tokenService.getToken();
    // request = request.clone({
    //   setHeaders: {
    //     'Accept-Language': lang,
    //   },
    // });
    if (token) {
      request = request.clone({
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        }),
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error['status'] === 403) {
          this.tokenService.removeToken();
          this.router.navigate(['/auth/login']);
        }
        return throwError(error);
      }),
    );
  }
  
}

