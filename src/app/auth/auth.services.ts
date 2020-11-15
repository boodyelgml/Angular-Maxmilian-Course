import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
  user = new Subject<User>();
  token: string;
  isAuth = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }



  // sign up
  signUp(email: string, password: string, token: boolean) {
    return this.http.post<responseAuthData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEkELjj9Vf3yF46q36fWZXpZC_IvUrCCE',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentivcation(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }))
  }


  // sign in
  signIn(email: string, password: string, token: boolean) {
    return this.http.post<responseAuthData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEkELjj9Vf3yF46q36fWZXpZC_IvUrCCE',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentivcation(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }))
  }


  // handle Authentivcation
  private handleAuthentivcation(email: string, id: string, idToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, idToken, expirationDate);
    this.user.next(user);
    this.token = user.token;
    localStorage.setItem('userLogedIn', JSON.stringify(user));
    this.isAuth.next(true)
  }

  // handle errors
  private handleError(errorCatched: HttpErrorResponse) {

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


  logout() {
    this.router.navigate(['/auth'])
    this.user.next(null);
    this.token = null;
    localStorage.removeItem('userLogedIn');
    this.isAuth.next(false)
  }

  autoLogin() {

    const logedInUser:
      {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
      }
      = JSON.parse(localStorage.getItem('userLogedIn'));

    if (!logedInUser) {
      console.log('failed to login');
      this.isAuth.next(false)
      this.router.navigate['/auth'];
      return;
    }

    const LoadedUser = new User(
      logedInUser.email
      , logedInUser.id
      , logedInUser._token
      , new Date(logedInUser._tokenExpirationDate)
    )
    console.log(LoadedUser)

    if (LoadedUser.token) {
      this.user.next(LoadedUser);
      this.isAuth.next(true);
      this.token = LoadedUser.token;
    }

  }

}
