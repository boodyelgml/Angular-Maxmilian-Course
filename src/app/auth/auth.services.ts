import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap, map, take } from 'rxjs/operators';
import { User } from './user.model';
import { stringify } from 'querystring';



export interface responseAuthData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}
@Injectable({ providedIn: 'root' })

export class AuthService {

  user = new BehaviorSubject<User>(null);
  token: string;
  private tokenExpirationTimer: any;

  // Constructor
  constructor(private http: HttpClient, private router: Router) {}

  // sign up
  signUp(email: string, password: string, token: boolean) {
    return this.http.post<responseAuthData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEkELjj9Vf3yF46q36fWZXpZC_IvUrCCE',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.onAuthFail), tap(resData => {
      this.onAuthSuccess(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }))
  }

  // log in
  logIn(email: string, password: string, token: boolean) {
    return this.http.post<responseAuthData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEkELjj9Vf3yF46q36fWZXpZC_IvUrCCE',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.onAuthFail), tap(resData => {
      this.onAuthSuccess(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }))
  }

  // auto login
  autoLogin() {

    const logedInUser: { email: string, id: string, _token: string, _tokenExpirationDate: string }
      = JSON.parse(localStorage.getItem('userLogedIn'));

    if (!logedInUser) {

      this.user.next(null);

      this.router.navigate['/auth'];

      return;
    }

    const LoadedUser = new User(logedInUser.email, logedInUser.id, logedInUser._token, new Date(logedInUser._tokenExpirationDate))

    if (LoadedUser.token) {

      this.user.next(LoadedUser);

      this.token = LoadedUser.token;

      const expirationTokenDate = new Date(logedInUser._tokenExpirationDate).getTime() - new Date().getTime();

      this.autoLogout(expirationTokenDate);
    }


  }

  // logout
  logout() {
    localStorage.removeItem('userLogedIn');
    this.user.next(null);
    this.token = null;
    this.router.navigate(['/auth'])

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    } else {
      this.tokenExpirationTimer = null;
    }
  }

  // autoLogout
  autoLogout(expirationTokenDate: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationTokenDate);

  }

  // on Auth Success
  private onAuthSuccess(email: string, id: string, idToken: string, expiresIn: number) {

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(email, id, idToken, expirationDate);

    this.user.next(user);

    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('userLogedIn', JSON.stringify(user));

  }

  // on Auth Fail
  private onAuthFail(errorCatched: HttpErrorResponse) {

    let errorMessage = 'unknown error';
    if (!errorCatched.error || !errorCatched.error.error) {
      return throwError(errorMessage);
    }
    switch (errorCatched.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'this email already exists'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email dosn\'t exist';
        break;

      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage);
  }

}
