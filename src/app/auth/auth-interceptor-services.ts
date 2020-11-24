import { AuthService } from './auth.services';
import { Injectable, OnInit } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable()
export class authInterceptorService implements HttpInterceptor {

  private token: string;

  constructor(private AuthService: AuthService) {

    this.AuthService.user.subscribe(value => {
      if (value != null) {
        this.token = value.token;
      }
    })
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedReq = req.clone({ params: new HttpParams().set('auth', this.token) });
    return next.handle(modifiedReq);
  }
}
